import teacher1 from '../assets/teachers/teacher1.webp'
import teacher1x2 from '../assets/teachers/teacher1@2x.webp'
import teacher2 from '../assets/teachers/teacher2.webp'
import teacher2x2 from '../assets/teachers/teacher2@2x.webp'
import teacher3 from '../assets/teachers/teacher3.webp'
import teacher3x2 from '../assets/teachers/teacher3@2x.webp'
import spaceClassroom from '../assets/spaces/classroom.webp'
import spaceClassroomX2 from '../assets/spaces/classroom@2x.webp'
import spaceStudyRoom from '../assets/spaces/study-room.webp'
import spaceStudyRoomX2 from '../assets/spaces/study-room@2x.webp'
import spaceConsultRoom from '../assets/spaces/consult-room.webp'
import spaceConsultRoomX2 from '../assets/spaces/consult-room@2x.webp'
import spaceMaterials from '../assets/spaces/materials.webp'
import spaceMaterialsX2 from '../assets/spaces/materials@2x.webp'

export type NavLink = {
  href: string
  label: string
  /** 좁은 화면 메뉴에만 넣는다. 데스크톱 헤더는 자리가 좁아 항목 수를 줄인다. */
  mobileOnly?: true
  /** 데스크톱 헤더에만 넣는다. 모바일은 하단 고정 바에 같은 동선이 있다. */
  desktopOnly?: true
}

export const NAV_LINKS: NavLink[] = [
  { href: '#about', label: '학원 소개' },
  { href: '#curriculum', label: '커리큘럼' },
  { href: '#process', label: '수업 방식' },
  { href: '#teachers', label: '강사진' },
  { href: '#location', label: '오시는 길', mobileOnly: true },
  { href: '#form', label: '상담 안내', desktopOnly: true },
]

export const ACADEMY_NAME = 'UPGRADE ENGLISH'
export const PHONE = '02-1234-5678'
export const PHONE_TEL = 'tel:0212345678'
export const ADDRESS = '서울특별시 강남구 강남대로 396'

/**
 * 지도 좌표. 주소가 고정이라 방문할 때마다 지오코딩을 호출하지 않고 상수로 둔다.
 * ADDRESS를 바꾸면 이 값도 함께 고쳐야 한다.
 */
export const COORDS = { lat: 37.4979, lng: 127.0276 }

export const OPENING_HOURS = [
  { days: '평일', hours: '14:00–22:00' },
  { days: '토요일', hours: '10:00–18:00' },
  { days: '일요일', hours: '휴무' },
]

export const HERO_STRIP = [
  {
    no: '01',
    title: '학생별 맞춤 학습',
    desc: '진단 결과에 따라 교재와 진도를 조정합니다.',
  },
  {
    no: '02',
    title: '학교별 내신 분석',
    desc: '학교 기출 유형과 서술형 출제 경향을 반영합니다.',
  },
  {
    no: '03',
    title: '주간 학습 관리',
    desc: '오답과 과제 이행률을 매주 확인합니다.',
  },
]

export const PAINS = [
  {
    no: '01',
    title: '공부는 하는데 성적이 그대로예요',
    desc: '학습량은 늘었지만 틀리는 유형이 매번 같은 경우입니다.',
  },
  {
    no: '02',
    title: '틀린 문제를 또 틀려요',
    desc: '채점 후 오답을 다시 풀어보는 과정이 빠져 있습니다.',
  },
  {
    no: '03',
    title: '아이에게 맞는 방법을 모르겠어요',
    desc: '어휘가 부족한 학생과 문법이 약한 학생의 처방은 다릅니다.',
  },
  {
    no: '04',
    title: '시험 직전에만 급하게 공부해요',
    desc: '평소 관리가 없으면 시험 기간에 할 수 있는 일이 적어집니다.',
  },
]

export const SOLUTIONS = [
  {
    no: '01',
    title: '개인별 학습 진단',
    desc: '어휘·문법·독해를 나눠 진단하고, 부족한 영역부터 순서를 정합니다.',
  },
  {
    no: '02',
    title: '학교별 내신 분석',
    desc: '재학 중인 학교의 기출 유형과 서술형 비중을 반영해 대비합니다.',
  },
  {
    no: '03',
    title: '1:1 오답 관리',
    desc: '틀린 문제는 다시 설명하고, 같은 유형을 풀어 확인까지 마칩니다.',
  },
  {
    no: '04',
    title: '주간 학습 리포트',
    desc: '출결·과제·단어 시험·오답 현황을 매주 학부모님께 공유합니다.',
  },
]

export type CurriculumBlock = { label: string; body: string }
export type CurriculumEntry = {
  key: string
  heading: string
  badge: string
  summary: string
  blocks: CurriculumBlock[]
}

export const CURRICULUM: CurriculumEntry[] = [
  {
    key: '초등',
    heading: '초등 고학년 과정',
    badge: '초 4–6',
    summary:
      '중학 영어로 넘어갈 때 무너지지 않도록, 어휘와 문장 구조의 기초를 문법 용어와 함께 정리합니다.',
    blocks: [
      { label: '학습 목표', body: '중등 교과 진입에 필요한 어휘 1,800개\n문장 단위 해석 습관 형성' },
      { label: '주요 학습 내용', body: '기초 문법 8품사 / 시제\n단락 독해 · 리딩 지문 요약' },
      { label: '수업 방식', body: '주 2–3회 · 1회 90분\n문법 설명 후 즉시 적용 문제 풀이' },
      { label: '관리 방법', body: '매 수업 단어 테스트\n미통과 시 재시험 후 귀가' },
    ],
  },
  {
    key: '중1',
    heading: '중학 1학년 과정',
    badge: '중 1',
    summary:
      '첫 내신 시험을 기준으로 학습 습관을 잡습니다. 교과서 본문 암기가 아니라 문장 구조 이해로 접근합니다.',
    blocks: [
      { label: '학습 목표', body: '학교 교과서 전 단원 구문 분석\n서술형 기본 문장 쓰기' },
      { label: '주요 학습 내용', body: '중등 필수 문법 1회독\n교과서 본문 + 부교재 병행' },
      { label: '수업 방식', body: '주 2회 · 1회 100분\n학교별 진도 맞춤 반 편성' },
      { label: '관리 방법', body: '단원별 오답 노트 점검\n시험 4주 전 내신 집중 전환' },
    ],
  },
  {
    key: '중2',
    heading: '중학 2학년 과정',
    badge: '중 2',
    summary:
      '성적 격차가 가장 크게 벌어지는 학년입니다. 문법 2회독과 서술형 대비를 동시에 진행합니다.',
    blocks: [
      { label: '학습 목표', body: '내신 90점 이상 안정화\n서술형 감점 요인 제거' },
      { label: '주요 학습 내용', body: '문법 심화 (분사 · to부정사 · 관계사)\n학교 기출 유형 분석' },
      { label: '수업 방식', body: '주 2–3회 · 1회 100분\n서술형 첨삭 수업 포함' },
      { label: '관리 방법', body: '주간 학습 리포트 발송\n1:1 오답 클리닉 (필요 시 추가 시간)' },
    ],
  },
  {
    key: '중3',
    heading: '중학 3학년 과정',
    badge: '중 3',
    summary:
      '고등 진학을 전제로 수업을 구성합니다. 내신을 유지하면서 고1 모의고사 형태의 독해로 넘어갑니다.',
    blocks: [
      { label: '학습 목표', body: '내신 유지 + 고1 과정 선행\n장문 독해 시간 관리' },
      { label: '주요 학습 내용', body: '고등 구문 독해 입문\n어법 문제 유형 훈련' },
      { label: '수업 방식', body: '주 3회 · 1회 110분\n내신 기간 / 선행 기간 분리 운영' },
      { label: '관리 방법', body: '월 1회 모의 점검\n진학 상담 병행' },
    ],
  },
]

export const STEPS = [
  { no: '01', en: 'LEVEL TEST', title: '레벨 테스트', desc: '어휘·문법·독해를\n30분간 진단합니다.' },
  { no: '02', en: 'GOAL SETTING', title: '학습 목표 설정', desc: '학년과 학교 기준에 맞춰\n목표를 정합니다.' },
  { no: '03', en: 'CUSTOM CLASS', title: '맞춤 수업', desc: '진단 결과에 따라 교재와 진도를 조정합니다.' },
  { no: '04', en: 'REVIEW', title: '복습·오답 관리', desc: '틀린 문제는 통과할 때까지 확인합니다.' },
  { no: '05', en: 'WEEKLY REPORT', title: '주간 리포트', desc: '학습 결과를 학부모께 정리해 전달합니다.' },
]

export const TEACHERS = [
  {
    role: '중등 내신 총괄',
    name: '김ㅇㅇ 선생님',
    field: '중등 내신 / 서술형 전문',
    bio: '학교별 기출 분석과 서술형 첨삭을 담당합니다. 문장을 쓰는 순서부터 잡아주는 수업을 진행합니다.',
    photo: teacher1,
    photo2x: teacher1x2,
  },
  {
    role: '문법 과정',
    name: '이ㅇㅇ 선생님',
    field: '고등 진학 대비 / 문법 전문',
    bio: '중3–고1 연계 구문 수업을 맡고 있습니다. 문법 용어를 학생의 언어로 다시 설명하는 데 집중합니다.',
    photo: teacher2,
    photo2x: teacher2x2,
  },
  {
    role: '초등 과정',
    name: '박ㅇㅇ 선생님',
    field: '초등 고학년 / 어휘·독해',
    bio: '중학 진입 전 어휘량과 읽기 습관을 만듭니다. 매 수업 단어 확인을 직접 진행합니다.',
    photo: teacher3,
    photo2x: teacher3x2,
  },
]

export const REVIEWS = [
  {
    tag: '중2 / 내신 대비',
    body: '수업만 듣고 끝나는 게 아니라 매주 무엇을 틀렸는지 확인할 수 있어서 좋았어요. 아이가 자기 약점을 말로 설명하기 시작했습니다.',
    author: '학부모 김○○',
  },
  {
    tag: '초6 / 중등 준비',
    body: '중학교 올라가기 전에 문법을 정리해주셔서 걱정이 줄었습니다. 단어 시험을 통과할 때까지 챙겨주시는 점이 마음에 들었어요.',
    author: '학부모 이○○',
  },
  {
    tag: '중3 / 서술형',
    body: '서술형에서 계속 감점이 났는데, 어떤 부분에서 틀리는지 첨삭으로 알려주셔서 같은 실수가 줄었습니다.',
    author: '학생 박○○',
  },
  {
    tag: '중1 / 첫 시험',
    body: '학교 기출 유형으로 미리 연습해서 첫 시험에서도 크게 당황하지 않았어요. 상담 때 설명이 구체적이었습니다.',
    author: '학부모 정○○',
  },
  {
    tag: '중2 / 학습 습관',
    body: '숙제를 안 해오면 그냥 넘어가지 않고 다시 확인해주십니다. 관리가 된다는 느낌이 있어서 계속 보내고 있어요.',
    author: '학부모 최○○',
  },
]

export const SPACES = [
  { photo: spaceClassroom, photo2x: spaceClassroomX2, title: '강의실', desc: '한 반 최대 8명, 판서 중심 수업 공간' },
  { photo: spaceStudyRoom, photo2x: spaceStudyRoomX2, title: '자습실', desc: '수업 전후 과제와 재시험을 진행' },
  { photo: spaceConsultRoom, photo2x: spaceConsultRoomX2, title: '상담실', desc: '진단 결과를 설명하는 별도 공간' },
  { photo: spaceMaterials, photo2x: spaceMaterialsX2, title: '학습 자료', desc: '학년별 교재와 학교별 기출 자료실' },
]

export const FAQS = [
  {
    q: '상담은 무료인가요?',
    a: '네, 상담과 레벨 테스트 모두 무료입니다. 등록을 전제로 하지 않으며, 상담 후 학습 방향만 안내받고 가시는 경우도 많습니다.',
  },
  {
    q: '레벨 테스트가 있나요?',
    a: '있습니다. 어휘·문법·독해 세 영역을 약 30분간 진단하고, 결과지를 바탕으로 반 배정과 학습 계획을 함께 설명드립니다.',
  },
  {
    q: '초등학생도 등록할 수 있나요?',
    a: '초등 4학년부터 가능합니다. 초등 고학년은 중학 과정 진입을 목표로 한 별도 반으로 운영됩니다.',
  },
  {
    q: '학교별 내신 대비가 가능한가요?',
    a: '가능합니다. 재원생이 다니는 학교의 기출 유형과 서술형 출제 경향을 정리해 시험 4주 전부터 학교별 대비 수업으로 전환합니다.',
  },
  {
    q: '수업은 몇 명씩 진행되나요?',
    a: '한 반 최대 8명으로 운영합니다. 수업 중 개별 확인과 오답 점검이 가능한 규모를 유지하기 위한 기준입니다.',
  },
  {
    q: '결석 시 보강이 가능한가요?',
    a: '사전에 알려주시면 같은 주 내 보강 시간을 안내드립니다. 무단 결석의 경우 과제 점검만 별도로 진행됩니다.',
  },
]

export const GRADE_OPTIONS = [
  '초등 4학년',
  '초등 5학년',
  '초등 6학년',
  '중학 1학년',
  '중학 2학년',
  '중학 3학년',
]

export const TIME_OPTIONS = [
  '평일 오후 (14–18시)',
  '평일 저녁 (18–21시)',
  '토요일 (10–17시)',
  '시간 무관',
]
