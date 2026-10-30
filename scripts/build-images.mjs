/**
 * assets-source/의 원본 사진에서 화면에 쓰는 webp와 OG 이미지를 만든다.
 *
 *   npm run images:build
 *
 * 원본(장당 2MB 안팎)은 저장소에 넣지 않는다(.gitignore). 사진을 교체할 일이 없다면
 * 이 스크립트를 돌릴 일도 없고, src/assets/에 생성된 결과물만 있으면 빌드된다.
 *
 * 표시 크기의 2배까지만 만든다. 그 이상은 고해상도 화면에서도 차이가 보이지 않는다.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-source')
const OUT = path.join(root, 'src', 'assets')
const PUBLIC = path.join(root, 'public')

/** [원본, 출력 경로, 가로폭, 세로/가로 비율] */
const TARGETS = [
  // 히어로는 데스크톱에서만 보이고 폭이 550px 안팎이다.
  ['hero/hero.png', 'hero/hero.webp', 1200, 3 / 4],

  // 강사 카드는 최대 350px 안팎. 1x와 2x를 만들어 srcset으로 넘긴다.
  ['teachers/teacher1.png', 'teachers/teacher1.webp', 400, 3 / 4],
  ['teachers/teacher1.png', 'teachers/teacher1@2x.webp', 800, 3 / 4],
  ['teachers/teacher2.png', 'teachers/teacher2.webp', 400, 3 / 4],
  ['teachers/teacher2.png', 'teachers/teacher2@2x.webp', 800, 3 / 4],
  ['teachers/teacher3.png', 'teachers/teacher3.webp', 400, 3 / 4],
  ['teachers/teacher3.png', 'teachers/teacher3@2x.webp', 800, 3 / 4],

  // 공간 사진은 최대 260px 안팎. 파일명은 아스키로 둔다(URL 인코딩 회피).
  ['spaces/강의실.png', 'spaces/classroom.webp', 320, 2 / 3],
  ['spaces/강의실.png', 'spaces/classroom@2x.webp', 640, 2 / 3],
  ['spaces/자습실.png', 'spaces/study-room.webp', 320, 2 / 3],
  ['spaces/자습실.png', 'spaces/study-room@2x.webp', 640, 2 / 3],
  ['spaces/상담실.png', 'spaces/consult-room.webp', 320, 2 / 3],
  ['spaces/상담실.png', 'spaces/consult-room@2x.webp', 640, 2 / 3],
  ['spaces/학습자료.png', 'spaces/materials.webp', 320, 2 / 3],
  ['spaces/학습자료.png', 'spaces/materials@2x.webp', 640, 2 / 3],
]

const kb = (n) => `${(n / 1024).toFixed(1)}KB`
let total = 0

for (const [from, to, width, ratio] of TARGETS) {
  const dest = path.join(OUT, to)
  await mkdir(path.dirname(dest), { recursive: true })
  const buf = await sharp(path.join(SRC, from))
    .resize(width, Math.round(width * ratio), { fit: 'cover', position: 'attention' })
    .webp({ quality: 78 })
    .toBuffer()
  await writeFile(dest, buf)
  total += buf.length
  console.log(`  ✓ ${to.padEnd(32)} ${String(width).padStart(4)}px ${kb(buf.length).padStart(9)}`)
}

/**
 * 투명 배경처럼 보이는 체크무늬가 픽셀로 박혀 있는 일러스트에서 배경을 걷어낸다.
 * 가장자리에서부터 무채색·밝은 픽셀만 따라 채워 나가므로, 인물 안쪽의 흰색은 남는다.
 */
async function cutout(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const isBg = (p) => {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2]
    return Math.min(r, g, b) >= 215 && Math.max(r, g, b) - Math.min(r, g, b) <= 12
  }

  const bg = new Uint8Array(w * h)
  const stack = []
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x)
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1)
  while (stack.length) {
    const p = stack.pop()
    if (bg[p] || !isBg(p)) continue
    bg[p] = 1
    const x = p % w
    if (x > 0) stack.push(p - 1)
    if (x < w - 1) stack.push(p + 1)
    if (p >= w) stack.push(p - w)
    if (p < w * (h - 1)) stack.push(p + w)
  }

  // 경계가 계단처럼 보이지 않도록 알파를 살짝 흐린다. 배경 쪽은 완전히 투명하게 둔다.
  const hard = Buffer.from(bg.map((v) => (v ? 0 : 255)))
  const soft = await sharp(hard, { raw: { width: w, height: h, channels: 1 } })
    .blur(0.8)
    .extractChannel(0)
    .raw()
    .toBuffer()

  const rgba = Buffer.alloc(w * h * 4)
  for (let p = 0; p < w * h; p++) {
    rgba.set(data.subarray(p * 3, p * 3 + 3), p * 4)
    rgba[p * 4 + 3] = bg[p] ? 0 : soft[p]
  }
  const png = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer()
  return sharp(png).trim({ threshold: 1 }).png().toBuffer()
}

// PAIN POINT 하단 일러스트는 최대 250px 안팎이라 2배인 500px 하나만 만든다.
{
  const to = 'painpoints/worried-parent.webp'
  const dest = path.join(OUT, to)
  await mkdir(path.dirname(dest), { recursive: true })
  const buf = await sharp(await cutout(path.join(SRC, 'pain_point/물음표와 함께 고민하는 소녀.png')))
    .resize(500)
    .webp({ quality: 82, alphaQuality: 90 })
    .toBuffer()
  await writeFile(dest, buf)
  total += buf.length
  console.log(`  ✓ ${to.padEnd(32)} ${String(500).padStart(4)}px ${kb(buf.length).padStart(9)}`)
}

// 카카오톡·슬랙 등의 링크 미리보기용. 1200x630은 대부분의 플랫폼이 쓰는 비율이다.
const og = await sharp(path.join(SRC, 'hero/hero.png'))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer()
await writeFile(path.join(PUBLIC, 'og.jpg'), og)
console.log(`  ✓ ${'public/og.jpg'.padEnd(32)} 1200px ${kb(og.length).padStart(9)}`)

console.log(`\n  합계 ${kb(total + og.length)}`)
