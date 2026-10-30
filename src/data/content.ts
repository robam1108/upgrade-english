import heroPortrait from '../assets/hero/hero-portrait.webp'
import heroPortraitX2 from '../assets/hero/hero-portrait@2x.webp'
import heroWide from '../assets/hero/hero-wide.webp'
import heroWideX2 from '../assets/hero/hero-wide@2x.webp'
import teacherLead from '../assets/teachers/lead.webp'
import teacherLeadX2 from '../assets/teachers/lead@2x.webp'
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
import elementaryPhoto from '../assets/curriculum/elementary.webp'
import elementaryPhotoX2 from '../assets/curriculum/elementary@2x.webp'

export const NAV_LINKS = [
  { href: '#about', label: '학원 소개' },
  { href: '#curriculum', label: '교육 과정' },
  { href: '#system', label: '학습 시스템' },
  { href: '#teacher', label: '강사진' },
  { href: '#classroom', label: '학원 둘러보기' },
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

export const HERO_PHOTO = {
  portrait: heroPortrait,
  portrait2x: heroPortraitX2,
  wide: heroWide,
  wide2x: heroWideX2,
  alt: '선생님이 화이트보드 앞에서 영어 표현을 설명하고, 학생들이 교재를 펴고 듣고 있는 수업 장면',
}

/** 히어로 하단의 사실 정보 띠. 기존 운영 정보(대상 학년, 반 정원, 상담 비용)에서 가져왔다. */
export const HERO_FACTS = [
  { en: 'For', value: '초등 4학년 – 중학 3학년' },
  { en: 'Class size', value: '한 반 최대 8명' },
  { en: 'First step', value: '무료 상담 · 레벨 테스트' },
]

export const VALUES = [
  {
    no: '01',
    en: 'Strong Basics',
    title: '기초부터 탄탄하게',
    desc: '흔들리지 않는 영어의 기본기를 형성합니다.',
    detail: '어휘와 문장 구조를 먼저 다지고, 다음 단계로 넘어갑니다.',
  },
  {
    no: '02',
    en: 'Personal Pace',
    title: '학생별 맞춤 지도',
    desc: '학생의 수준과 학습 속도에 맞춰 지도합니다.',
    detail: '진단 결과에 따라 교재와 진도를 조정합니다.',
  },
  {
    no: '03',
    en: 'Steady Growth',
    title: '꾸준한 성장 관리',
    desc: '학습 과정을 점검하고 부족한 부분을 보완합니다.',
    detail: '오답과 과제 이행 상황을 매주 확인합니다.',
  },
] as const

export type CurriculumItem = { title: string; desc: string }

export const ELEMENTARY = {
  en: 'Elementary',
  label: '초등부',
  grades: '초등 4–6학년',
  heading: ['영어의 즐거움을 알고,', '기초를 완성하는 시간.'],
  summary: '듣고 읽는 경험을 충분히 쌓으면서, 중학 영어로 넘어갈 기초 체력을 만듭니다.',
  items: [
    { title: '파닉스 및 기초 어휘', desc: '소리와 철자의 규칙을 점검하고 학년별 필수 어휘를 쌓습니다.' },
    { title: '기초 문법 및 문장 구조', desc: '품사와 시제를 문장 안에서 익혀 해석 습관을 만듭니다.' },
    { title: '리딩 및 리스닝', desc: '수준에 맞는 지문을 듣고 읽으며 내용을 요약합니다.' },
    { title: '영어 표현 및 활용', desc: '배운 표현을 직접 말하고 써 보며 내 것으로 만듭니다.' },
  ] satisfies CurriculumItem[],
  schedule: '주 2–3회 · 1회 90분',
  photo: elementaryPhoto,
  photo2x: elementaryPhotoX2,
}

export const MIDDLE = {
  en: 'Middle School',
  label: '중등부',
  grades: '중학 1–3학년',
  heading: ['배운 영어를 실력으로,', '실력을 결과로.'],
  summary: '재학 중인 학교의 출제 경향에 맞춰 내신을 준비하고, 고등 영어까지 이어지는 실력을 만듭니다.',
  items: [
    { title: '학교별 내신 대비', desc: '학교 기출 유형을 분석해 시험 4주 전부터 집중 대비합니다.' },
    { title: '핵심 문법 및 독해', desc: '중등 필수 문법을 구문 독해와 함께 체계적으로 정리합니다.' },
    { title: '서술형 및 수행평가', desc: '감점 요인을 첨삭으로 짚고, 문장을 쓰는 순서부터 잡습니다.' },
    { title: '실전 문제 풀이 및 오답 관리', desc: '틀린 문제는 같은 유형을 다시 풀어 통과할 때까지 확인합니다.' },
  ] satisfies CurriculumItem[],
  schedule: '주 2–3회 · 1회 100분 내외',
}

export const SYSTEM_STEPS = [
  {
    no: '01',
    en: 'Learn',
    title: '개념 학습',
    desc: '수업을 통해 새로운 개념과 영어 표현을 익힙니다.',
  },
  {
    no: '02',
    en: 'Review',
    title: '반복 복습',
    desc: '배운 내용을 반복하여 이해도를 높입니다.',
  },
  {
    no: '03',
    en: 'Test',
    title: '학습 점검',
    desc: '테스트를 통해 부족한 영역을 파악합니다.',
  },
  {
    no: '04',
    en: 'Feedback',
    title: '맞춤 피드백',
    desc: '결과를 바탕으로 다음 학습 방향을 설정합니다.',
  },
] as const

export const LEAD_TEACHER = {
  role: '중등 내신 총괄',
  name: '김ㅇㅇ 선생님',
  fields: ['중등 내신', '서술형 첨삭', '학교별 기출 분석'],
  philosophy:
    '영어를 잘하게 되는 방법은 학생마다 다릅니다. 먼저 이 학생이 어디에서 막히는지 이해하고, 그 지점부터 함께 풀어 갑니다.',
  methods: [
    '학교별 기출을 분석해 수업 자료에 반영합니다.',
    '서술형은 문장을 쓰는 순서부터 첨삭으로 잡아 줍니다.',
    '틀린 문제는 학생이 직접 설명할 수 있을 때까지 확인합니다.',
  ],
  photo: teacherLead,
  photo2x: teacherLeadX2,
}

export const OTHER_TEACHERS = [
  {
    role: '문법 과정',
    name: '이ㅇㅇ 선생님',
    field: '고등 진학 대비 · 문법',
    photo: teacher2,
    photo2x: teacher2x2,
  },
  {
    role: '초등 과정',
    name: '박ㅇㅇ 선생님',
    field: '초등 고학년 · 어휘와 독해',
    photo: teacher3,
    photo2x: teacher3x2,
  },
]

export const CLASSROOM = {
  classroom: {
    en: 'Our Classroom',
    title: '강의실',
    desc: '한 반 최대 8명. 선생님이 한 명 한 명의 답을 확인할 수 있는 규모입니다.',
    photo: spaceClassroom,
    photo2x: spaceClassroomX2,
    alt: '책상과 의자가 정돈된 밝은 강의실과 화이트보드',
  },
  study: {
    en: 'Focused Learning',
    title: '자습실',
    desc: '수업 전후 과제와 단어 재시험을 진행합니다.',
    photo: spaceStudyRoom,
    photo2x: spaceStudyRoomX2,
    alt: '칸막이 책상이 줄지어 놓인 조용한 자습실',
  },
  consult: {
    en: 'Personal Care',
    title: '상담실',
    desc: '진단 결과와 학습 방향을 차분히 설명하는 별도 공간입니다.',
    photo: spaceConsultRoom,
    photo2x: spaceConsultRoomX2,
    alt: '창가에 책상과 의자 두 개가 놓인 상담실',
  },
  materials: {
    en: 'Learning Materials',
    title: '학습자료실',
    desc: '학년별 교재와 학교별 기출 자료를 갖춰 두었습니다.',
    photo: spaceMaterials,
    photo2x: spaceMaterialsX2,
    alt: '학년별 영어 교재와 워크북이 꽂힌 책장',
  },
}

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
