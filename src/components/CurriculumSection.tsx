import { useState } from 'react'
import { ArrowRight, Check, Clock } from 'lucide-react'
import Reveal from './Reveal'
import SectionMark from './ui/SectionMark'
import { ELEMENTARY, MIDDLE } from '../data/content'

/**
 * 데스크톱에서 두 카드는 48px 엇갈려 놓인다. 아래쪽 카드에 호버하면 그 카드가 위로,
 * 다른 카드는 그만큼 아래로 내려가 자리를 맞바꾼다. 마우스를 떼도 마지막 상태를 유지한다.
 */
type Track = 'elementary' | 'middle'
type CardProps = { raised: boolean; onRaise: () => void }

const CARD_MOVE = 'motion-keep transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]'
const cardOffset = (raised: boolean) => (raised ? 'lg:translate-y-0' : 'lg:translate-y-12')

function CardLink({ tone }: { tone: 'sky' | 'navy' }) {
  const base =
    'group inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-btn)] px-5 text-[15px] font-bold transition-colors duration-300'
  const color = tone === 'sky' ? 'bg-navy text-ivory hover:bg-navy-deep' : 'bg-butter text-navy hover:bg-butter-deep'
  return (
    <a href="#contact" className={`${base} ${color}`}>
      반 배정 상담하기
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}

/** 초등부: 곡선, 밝은 하늘색, 둥근 블록. */
function ElementaryCard({ raised, onRaise }: CardProps) {
  return (
    <article
      aria-labelledby="elementary-heading"
      onMouseEnter={onRaise}
      onFocus={onRaise}
      className={`relative flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] rounded-tl-[72px] bg-sky-soft p-7 sm:p-10 ${CARD_MOVE} ${cardOffset(raised)}`}
    >
      {/* 부드러운 곡선 그래픽. 카드 오른쪽 위를 감싸며 사진 자리를 만든다. */}
      <svg
        aria-hidden
        viewBox="0 0 300 300"
        className="pointer-events-none absolute -right-20 -top-24 size-[300px] text-sky sm:-right-16 sm:-top-20"
      >
        <path
          fill="currentColor"
          d="M248 64c34 34 44 92 20 138s-82 78-138 72S22 228 14 172 34 60 78 32s136-2 170 32Z"
        />
      </svg>
      <img
        src={ELEMENTARY.photo}
        srcSet={`${ELEMENTARY.photo} 280w, ${ELEMENTARY.photo2x} 560w`}
        sizes="120px"
        alt="학년별 리딩·리스닝 교재가 색깔별로 꽂힌 책장"
        width={280}
        height={280}
        loading="lazy"
        className="absolute right-6 top-6 size-[96px] rounded-full border-4 border-ivory object-cover sm:right-8 sm:top-8 sm:size-[120px]"
      />

      <div className="relative">
        <p className="t-eyebrow m-0 text-sky-deep">{ELEMENTARY.en}</p>
        <p className="m-0 mt-3 flex items-center gap-2 text-[15px] font-bold text-navy">
          {ELEMENTARY.label}
          <span className="rounded-full bg-ivory px-2.5 py-1 text-[13px] font-semibold text-sky-deep">
            {ELEMENTARY.grades}
          </span>
        </p>
        <h3 id="elementary-heading" className="t-title mt-8 max-w-[12em] text-navy sm:mt-16">
          {ELEMENTARY.heading[0]}
          <br />
          {ELEMENTARY.heading[1]}
        </h3>
        <p className="t-body m-0 mt-4 max-w-[28em] text-ink-soft">{ELEMENTARY.summary}</p>
      </div>

      <ul className="relative m-0 mt-8 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2">
        {ELEMENTARY.items.map((item) => (
          <li key={item.title} className="rounded-[20px] bg-ivory/80 p-5">
            <span className="flex items-center gap-2 text-[16px] font-bold text-navy">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sky text-navy">
                <Check aria-hidden className="size-3.5" strokeWidth={3} />
              </span>
              {item.title}
            </span>
            <span className="mt-2 block t-small text-ink-soft">{item.desc}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink-soft">
          <Clock aria-hidden className="size-4" />
          {ELEMENTARY.schedule}
        </span>
        <CardLink tone="sky" />
      </div>
    </article>
  )
}

/** 중등부: 직선, 네이비, 번호가 매겨진 표. */
function MiddleCard({ raised, onRaise }: CardProps) {
  return (
    <article
      aria-labelledby="middle-heading"
      onMouseEnter={onRaise}
      onFocus={onRaise}
      className={`relative flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-navy p-7 text-ivory sm:p-10 ${CARD_MOVE} ${cardOffset(raised)}`}
    >
      {/* 모눈 그래픽. 구조적이고 정돈된 인상을 준다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.09] [background-image:linear-gradient(to_right,#f7f8f3_1px,transparent_1px),linear-gradient(to_bottom,#f7f8f3_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_left,black,transparent)]"
      />

      <div className="relative">
        <p className="t-eyebrow m-0 text-sky">{MIDDLE.en}</p>
        <p className="m-0 mt-3 flex items-center gap-2 text-[15px] font-bold text-ivory">
          {MIDDLE.label}
          <span className="rounded-[6px] border border-ivory/30 px-2.5 py-1 text-[13px] font-semibold text-sky-soft">
            {MIDDLE.grades}
          </span>
        </p>
        <h3 id="middle-heading" className="t-title mt-8 max-w-[12em] text-ivory sm:mt-16">
          {MIDDLE.heading[0]}
          <br />
          <span className="text-butter">{MIDDLE.heading[1]}</span>
        </h3>
        <p className="t-body m-0 mt-4 max-w-[28em] text-sky-soft/85">{MIDDLE.summary}</p>
      </div>

      <ol className="relative m-0 mt-8 list-none border-t border-ivory/20 p-0">
        {MIDDLE.items.map((item, i) => (
          <li key={item.title} className="grid grid-cols-[40px_1fr] gap-x-3 border-b border-ivory/20 py-4">
            <span className="font-en text-[14px] font-bold text-butter tnum">0{i + 1}</span>
            <span>
              <span className="block text-[16px] font-bold text-ivory">{item.title}</span>
              <span className="mt-1 block t-small text-sky-soft/80">{item.desc}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-sky-soft/85">
          <Clock aria-hidden className="size-4" />
          {MIDDLE.schedule}
        </span>
        <CardLink tone="navy" />
      </div>
    </article>
  )
}

export default function CurriculumSection() {
  const [raised, setRaised] = useState<Track>('elementary')

  return (
    <section id="curriculum" aria-labelledby="curriculum-heading" className="section-y bg-warm-gray/60">
      <div className="container-x">
        <SectionMark index="02" label="Curriculum" />
        {/* 제목을 오른쪽으로 들여 쓰고, 왼쪽 여백에는 두 과정의 목차를 둔다. 잡지의 장 표지처럼. */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          <Reveal className="order-2 lg:order-none lg:col-span-3 lg:pt-3">
            <ul className="m-0 flex list-none gap-6 p-0 lg:flex-col lg:gap-5">
              <li>
                <span className="t-eyebrow block text-sky-deep">{ELEMENTARY.en}</span>
                <span className="mt-2 block text-[15px] font-semibold text-navy">{ELEMENTARY.grades}</span>
              </li>
              <li>
                <span className="t-eyebrow block text-sky-deep">{MIDDLE.en}</span>
                <span className="mt-2 block text-[15px] font-semibold text-navy">{MIDDLE.grades}</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-9">
            <h2 id="curriculum-heading" className="t-h2 text-navy">
              학년이 다르면,
              <br /> 배우는 목적도 다릅니다.
            </h2>
            <p className="t-body m-0 mt-5 max-w-[34em] text-ink-soft">
              초등부는 영어와 친해지며 기초를 완성하고, 중등부는 그 기초를 내신과 실력으로 연결합니다.
            </p>
          </Reveal>
        </div>

        {/* 카드는 transform으로 움직이므로, 내려간 카드가 차지할 48px를 pb-12로 미리 비워 둔다. */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6 lg:pb-12">
          <Reveal className="flex">
            <ElementaryCard raised={raised === 'elementary'} onRaise={() => setRaised('elementary')} />
          </Reveal>
          <Reveal delay={0.1} className="flex">
            <MiddleCard raised={raised === 'middle'} onRaise={() => setRaised('middle')} />
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-col items-start gap-3 rounded-[20px] border border-navy/15 p-6 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
          <p className="m-0 text-[16px] font-semibold text-navy">
            어느 반이 맞을지 고민되시나요?
            <span className="mt-1 block text-[15px] font-normal text-ink-soft sm:ml-2 sm:mt-0 sm:inline">
              30분 레벨 테스트로 어휘·문법·독해를 먼저 진단해 드립니다. (무료)
            </span>
          </p>
          <a
            href="#contact"
            className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[15px] font-bold text-sky-deep underline decoration-sky decoration-2 underline-offset-[6px]"
          >
            레벨 테스트 신청
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
