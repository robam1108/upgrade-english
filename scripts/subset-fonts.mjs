/**
 * 웹폰트 서브셋 생성기.
 *
 *   npm run fonts:subset
 *
 * 원본을 그대로 쓰면 SUIT 가변 폰트만 600KB가 넘는다. 이 스크립트는 원본을
 * assets-source/fonts/에 한 번 받아 두고, 필요한 글자만 남긴 woff2와 그에 맞는
 * @font-face 규칙(src/fonts.css)을 만든다.
 *
 * 글자 집합은 소스에서 자동으로 뽑으므로, 문구를 바꿨으면 이 스크립트만 다시 돌리면 된다.
 *
 *  - SUIT(한글 본문·제목)는 두 조각으로 나눈다.
 *      suit-subset : 페이지에 실제로 쓰인 글자. 모든 방문자가 받는다.
 *      suit-extra  : 상용 한글(KS X 1001) 중 페이지에 없는 나머지.
 *                    상담 폼에 그런 글자를 입력할 때만 받는다.
 *    두 조각의 unicode-range는 서로 겹치지 않게 만든다.
 *  - DM Sans(영문 레이블·숫자)는 라틴 한 조각이면 된다.
 *  - 에이투지체(제목)는 Bold 한 굵기를 페이지 글자로만 만든다.
 *    제목은 정해진 문구라 나머지 조각이 필요 없다.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import subsetFont from 'subset-font'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CACHE_DIR = path.join(root, 'assets-source', 'fonts')
const OUT_DIR = path.join(root, 'src', 'assets', 'fonts')
const CSS_OUT = path.join(root, 'src', 'fonts.css')
const SRC_DIR = path.join(root, 'src')

const SOURCES = {
  suit: {
    url: 'https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2.0.5/fonts/variable/woff2/SUIT-Variable.woff2',
    cache: 'SUIT-Variable.woff2',
  },
  dmSans: {
    url: 'https://cdn.jsdelivr.net/npm/@fontsource-variable/dm-sans@5.2.8/files/dm-sans-latin-wght-normal.woff2',
    cache: 'dm-sans-latin-wght-normal.woff2',
  },
  a2zBold: {
    url: 'https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-7Bold.woff2',
    cache: 'a2z-7Bold.woff2',
  },
}

/** KS X 1001(완성형)에 들어 있는 상용 한글 2,350자. */
function ksx1001Hangul() {
  const decoder = new TextDecoder('euc-kr')
  const out = new Set()
  for (let lead = 0xb0; lead <= 0xc8; lead++) {
    for (let trail = 0xa1; trail <= 0xfe; trail++) {
      const ch = decoder.decode(new Uint8Array([lead, trail]))
      if (ch.length !== 1) continue
      const code = ch.codePointAt(0)
      if (code >= 0xac00 && code <= 0xd7a3) out.add(ch)
    }
  }
  return out
}

async function sourceFiles(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await sourceFiles(full)))
    else if (/\.(ts|tsx|html)$/.test(entry.name)) found.push(full)
  }
  return found
}

/** 소스에 등장하는 모든 글자. 화면에 안 뜨는 식별자까지 섞이지만 전부 아스키라 비용이 없다. */
async function charsFromSource() {
  const files = [...(await sourceFiles(SRC_DIR)), path.join(root, 'index.html')]
  const chars = new Set()
  for (const file of files) {
    for (const ch of await readFile(file, 'utf8')) chars.add(ch)
  }
  return chars
}

/** 코드포인트 목록을 CSS unicode-range 문자열로 압축한다. */
function toUnicodeRange(chars) {
  const codes = [...chars].map((c) => c.codePointAt(0)).sort((a, b) => a - b)
  const parts = []
  const hex = (n) => n.toString(16).toUpperCase()
  let start = codes[0]
  let prev = codes[0]
  const flush = () => parts.push(start === prev ? `U+${hex(start)}` : `U+${hex(start)}-${hex(prev)}`)
  for (const code of codes.slice(1)) {
    if (code === prev + 1) {
      prev = code
    } else {
      flush()
      start = code
      prev = code
    }
  }
  flush()
  return parts.join(', ')
}

async function download({ url, cache }) {
  const dest = path.join(CACHE_DIR, cache)
  if (existsSync(dest)) return readFile(dest)
  process.stdout.write(`  ↓ ${cache} 내려받는 중…\n`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  return buf
}

const kb = (n) => `${(n / 1024).toFixed(1)}KB`
let totalAfter = 0

async function emit(name, original, chars) {
  const subset = await subsetFont(original, [...chars].join(''), { targetFormat: 'woff2' })
  await writeFile(path.join(OUT_DIR, `${name}.woff2`), subset)
  totalAfter += subset.length
  console.log(`  ✓ ${name.padEnd(28)} ${kb(subset.length).padStart(9)}  (${chars.size}자)`)
  return subset.length
}

await mkdir(CACHE_DIR, { recursive: true })
await mkdir(OUT_DIR, { recursive: true })

const sourceChars = await charsFromSource()
const ascii = new Set(
  Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)),
)
// 카피에서 쓰는 약물. 소스에서 이미 잡히지만 명시해 두면 문구가 바뀌어도 빠지지 않는다.
const punctuation = new Set('·–—…※○×→←“”‘’')

const pageChars = new Set([...ascii, ...punctuation, ...sourceChars])
const extraChars = new Set([...ksx1001Hangul()].filter((c) => !pageChars.has(c)))
// DM Sans는 영문 레이블·숫자에만 쓴다. 아스키와 약물이면 충분하다.
const latinChars = new Set([...ascii, ...punctuation])

const suit = await download(SOURCES.suit)
const dmSans = await download(SOURCES.dmSans)
const a2zBold = await download(SOURCES.a2zBold)
const totalBefore = suit.length + dmSans.length + a2zBold.length

const firstLoad =
  (await emit('suit-subset', suit, pageChars)) +
  (await emit('dm-sans-subset', dmSans, latinChars)) +
  (await emit('a2z-bold-subset', a2zBold, pageChars))

await emit('suit-extra', suit, extraChars)

const generatedBy = 'npm run fonts:subset'
const css = [
  `/* 이 파일은 \`${generatedBy}\`이 생성합니다. 직접 고치지 마세요. */`,
  '',
  '/* SUIT — SIL Open Font License 1.1, https://github.com/sun-typeface/SUIT',
  '   페이지에 실제로 쓰인 글자. 모든 방문자가 받습니다. */',
  '@font-face {',
  '  font-family: "SUIT Variable";',
  '  src: url("./assets/fonts/suit-subset.woff2") format("woff2-variations");',
  '  font-weight: 100 900;',
  '  font-style: normal;',
  '  font-display: swap;',
  `  unicode-range: ${toUnicodeRange(pageChars)};`,
  '}',
  '',
  '/* 상용 한글(KS X 1001) 중 페이지에 없는 나머지.',
  '   상담 폼에 이런 글자를 입력할 때만 받습니다. */',
  '@font-face {',
  '  font-family: "SUIT Variable";',
  '  src: url("./assets/fonts/suit-extra.woff2") format("woff2-variations");',
  '  font-weight: 100 900;',
  '  font-style: normal;',
  '  font-display: swap;',
  `  unicode-range: ${toUnicodeRange(extraChars)};`,
  '}',
  '',
  '/* DM Sans — SIL Open Font License 1.1, https://github.com/googlefonts/dm-fonts */',
  '@font-face {',
  '  font-family: "DM Sans";',
  '  src: url("./assets/fonts/dm-sans-subset.woff2") format("woff2-variations");',
  '  font-weight: 100 1000;',
  '  font-style: normal;',
  '  font-display: swap;',
  '}',
  '',
  '/* 에이투지체 — noonnu.cc/font_page/1778, 상업적 이용/재배포 무료 */',
  '@font-face {',
  '  font-family: "A2z";',
  '  src: url("./assets/fonts/a2z-bold-subset.woff2") format("woff2");',
  '  font-weight: 700;',
  '  font-style: normal;',
  '  font-display: swap;',
  `  unicode-range: ${toUnicodeRange(pageChars)};`,
  '}',
  '',
].join('\n')

await writeFile(CSS_OUT, css)
console.log('  ✓ src/fonts.css')
console.log(`\n  원본 ${kb(totalBefore)} → 서브셋 ${kb(totalAfter)}`)
console.log(`  첫 로드에 받는 양: ${kb(firstLoad)} (나머지는 폼 입력 시에만)`)
