/**
 * assets-source/의 원본 사진에서 화면에 쓰는 webp와 OG 이미지를 만든다.
 *
 *   npm run images:build
 *
 * 원본(장당 2MB 안팎)은 저장소에 넣지 않는다(.gitignore). 사진을 교체할 일이 없다면
 * 이 스크립트를 돌릴 일도 없고, src/assets/에 생성된 결과물만 있으면 빌드된다.
 *
 * 표시 크기의 2배까지만 만든다. 원본이 그보다 작으면 원본 해상도가 상한이다
 * (원본은 1448×1086, 1536×1024).
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-source')
const OUT = path.join(root, 'src', 'assets')
const PUBLIC = path.join(root, 'public')

/** [원본, 출력 경로, 가로폭, 세로/가로 비율, 크롭 기준] */
const TARGETS = [
  // 히어로. 데스크톱은 세로형(약 520px 폭), 모바일은 가로형(화면 폭)으로 따로 자른다.
  ['hero/hero.png', 'hero/hero-portrait.webp', 560, 5 / 4, 'attention'],
  ['hero/hero.png', 'hero/hero-portrait@2x.webp', 860, 5 / 4, 'attention'],
  ['hero/hero.png', 'hero/hero-wide.webp', 750, 3 / 4, 'attention'],
  ['hero/hero.png', 'hero/hero-wide@2x.webp', 1200, 3 / 4, 'attention'],

  // 대표 강사는 세로 4:5, 보조 강사는 원형 썸네일이라 정사각형.
  ['teachers/teacher1.png', 'teachers/lead.webp', 520, 5 / 4, 'attention'],
  ['teachers/teacher1.png', 'teachers/lead@2x.webp', 860, 5 / 4, 'attention'],
  ['teachers/teacher2.png', 'teachers/teacher2.webp', 160, 1, 'attention'],
  ['teachers/teacher2.png', 'teachers/teacher2@2x.webp', 320, 1, 'attention'],
  ['teachers/teacher3.png', 'teachers/teacher3.webp', 160, 1, 'attention'],
  ['teachers/teacher3.png', 'teachers/teacher3@2x.webp', 320, 1, 'attention'],

  // 공간 갤러리. 강의실은 왼쪽 큰 칸(정사각형에 가깝게), 자습실·상담실은 오른쪽 3:2,
  // 학습자료실은 아래 와이드 띠.
  ['spaces/강의실.png', 'spaces/classroom.webp', 640, 1, 'centre'],
  ['spaces/강의실.png', 'spaces/classroom@2x.webp', 1024, 1, 'centre'],
  ['spaces/자습실.png', 'spaces/study-room.webp', 520, 2 / 3, 'centre'],
  ['spaces/자습실.png', 'spaces/study-room@2x.webp', 1040, 2 / 3, 'centre'],
  ['spaces/상담실.png', 'spaces/consult-room.webp', 520, 2 / 3, 'centre'],
  ['spaces/상담실.png', 'spaces/consult-room@2x.webp', 1040, 2 / 3, 'centre'],
  ['spaces/학습자료.png', 'spaces/materials.webp', 800, 3 / 8, 'centre'],
  ['spaces/학습자료.png', 'spaces/materials@2x.webp', 1536, 3 / 8, 'centre'],

  // 초등부 카드의 원형 사진. 학습자료실의 컬러 교재 칸만 잘라 쓴다.
  ['spaces/학습자료.png', 'curriculum/elementary.webp', 280, 1, 'east'],
  ['spaces/학습자료.png', 'curriculum/elementary@2x.webp', 560, 1, 'east'],
]

const kb = (n) => `${(n / 1024).toFixed(1)}KB`
let total = 0

for (const [from, to, width, ratio, position] of TARGETS) {
  const dest = path.join(OUT, to)
  await mkdir(path.dirname(dest), { recursive: true })
  const buf = await sharp(path.join(SRC, from))
    .resize(width, Math.round(width * ratio), { fit: 'cover', position })
    .webp({ quality: 80 })
    .toBuffer()
  await writeFile(dest, buf)
  total += buf.length
  console.log(`  ✓ ${to.padEnd(32)} ${String(width).padStart(4)}px ${kb(buf.length).padStart(9)}`)
}

// 카카오톡·슬랙 등의 링크 미리보기용. 1200x630은 대부분의 플랫폼이 쓰는 비율이다.
const og = await sharp(path.join(SRC, 'hero/hero.png'))
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer()
await writeFile(path.join(PUBLIC, 'og.jpg'), og)
console.log(`  ✓ ${'public/og.jpg'.padEnd(32)} 1200px ${kb(og.length).padStart(9)}`)

console.log(`\n  합계 ${kb(total + og.length)}`)
