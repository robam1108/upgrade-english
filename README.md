# UPGRADE ENGLISH v2

초·중등 영어학원 랜딩페이지 리디자인 (포트폴리오용 가상 브랜드).
콘셉트는 **Bright Editorial Education** — 아이보리 바탕에 하늘색·버터 옐로·네이비를 쓰는 에디토리얼 레이아웃입니다.

React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion으로 만든 단일 페이지입니다.
사업자 정보와 강사 정보는 모두 실제 정보가 아닙니다.

## 실행

```bash
npm install
npm run dev
```

| 스크립트 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (http://localhost:5174) |
| `npm run build` | 타입 체크 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | oxlint |
| `npm run fonts:subset` | 웹폰트 서브셋 생성 (아래 참고) |
| `npm run images:build` | `assets-source/`의 원본 사진 → `src/assets/`의 webp·OG 이미지 생성 |

## 네이버 지도

푸터의 지도는 네이버 클라우드 플랫폼의 Maps JavaScript API를 씁니다.

```bash
# .env
VITE_NAVER_MAP_CLIENT_ID=발급받은_키
```

키가 없으면 지도 자리에 안내 플레이스홀더가 표시되고, 나머지 페이지는 정상 동작합니다.

`VITE_` 접두사가 붙은 값은 빌드 결과물에 그대로 포함됩니다. 네이버 콘솔에서
**서비스 URL(도메인)을 반드시 등록**해 다른 도메인에서의 사용을 막아야 합니다.

지도는 푸터가 화면에 가까워질 때 지연 로드되며, 좌표는 `src/components/NaverMap.tsx`에
상수로 두어 방문마다 geocoding API를 호출하지 않습니다. 주소를 바꾸면 좌표도 함께 수정하세요.

## 디자인 시스템

`src/index.css`의 `@theme`와 `@utility`에 모여 있습니다.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `ivory` | #F7F8F3 | 기본 배경 |
| `sky-soft` | #DCEFFA | 보조 배경 (강사진, 초등부 카드) |
| `sky` | #91C8E7 | 포인트 면·선 (텍스트로는 쓰지 않음) |
| `butter` | #F5D77E | CTA, 강조, 원형 모티프, 상담 섹션 배경 |
| `navy` | #263B50 | 본문, 버튼, 학습 시스템·푸터 배경 |
| `warm-gray` | #E9E8E1 | 교육 과정·FAQ 배경, 보조 카드 |

텍스트용 파생 색(`ink-soft`, `ink-mute`, `sky-deep`)은 사용하는 배경에서 명도대비 4.5:1 이상입니다.

타이포는 `t-display → t-h2 → t-h3 → t-lead → t-body → t-small → t-eyebrow` 단계만 씁니다.
모든 섹션은 `SectionMark`("(01) Our Philosophy ———")로 시작해, 레이아웃이 달라도 한 흐름으로 읽힙니다.

## 웹폰트

한글은 [SUIT](https://github.com/sun-typeface/SUIT), 영문 레이블·숫자는 [DM Sans](https://github.com/googlefonts/dm-fonts)를 씁니다.
둘 다 SIL Open Font License입니다.

실제로 쓰는 글자만 서브셋해 `src/assets/fonts/`에 셀프호스팅합니다.

```bash
npm run fonts:subset
```

스크립트는 원본 폰트를 `assets-source/fonts/`에 한 번 내려받아 캐시하고, 페이지에 실제로
쓰이는 글자만 남긴 woff2와 `src/fonts.css`(@font-face 규칙)를 만듭니다.

SUIT는 두 조각으로 나뉩니다. 페이지에 쓰인 글자(약 112KB)는 모든 방문자가 받고,
나머지 상용 한글은 상담 폼에 그런 글자를 입력할 때만 받습니다.

> **카피를 고쳤으면 `npm run fonts:subset`을 다시 돌리세요.** 새로 생긴 글자가 서브셋에
> 없으면 그 글자 하나 때문에 400KB짜리 나머지 조각을 전부 내려받게 됩니다.

첫 로드 폰트 용량: **약 137KB**

## 구조

```
src/
├─ components/     섹션 단위 컴포넌트 (Header → Footer 순서대로)
│  └─ ui/          SectionMark, ButtonLink 등 공통 조각
├─ data/content.ts 모든 카피·목록 데이터
└─ index.css       Tailwind @theme 토큰 + @font-face
```

카피와 목록은 전부 `src/data/content.ts`에 모여 있어, 문구 수정은 이 파일만 고치면 됩니다.

## 상담 폼

**폼은 데모입니다.** 입력값을 검증하고, 제출하면 "실제로 접수되지 않았다"는 데모 안내 화면을 보여줍니다. 어디에도 전송되지 않습니다.
실제로 운영하려면 전송 백엔드, 개인정보 수집·이용 고지(수집 항목·목적·보유기간),
스팸 방지, 전환 추적이 추가로 필요합니다.
