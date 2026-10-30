import Reveal from './Reveal'
import { PAINS } from '../data/content'
import worriedParent from '../assets/painpoints/worried-parent.webp'

type Pain = (typeof PAINS)[number]

/**
 * 하단 학부모의 속마음처럼 보이도록 꼬리가 달린 말풍선.
 * 2열에서는 왼쪽 열은 왼쪽 가장자리에, 오른쪽 열은 오른쪽 가장자리에 꼬리를 두고
 * 꼬리 끝은 가운데 쪽으로 휜다. 1열(모바일)은 모두 왼쪽 열과 같다.
 */
function SpeechBubble({ pain, side }: { pain: Pain; side: 'left' | 'right' }) {
  // 기본(모바일·왼쪽 열)은 왼쪽에 붙어 꼬리 끝이 오른쪽으로 휜다. 오른쪽 열만 반대로 둔다.
  const tailPosition = side === 'right' ? 'sm:left-auto sm:right-10 sm:scale-x-100' : ''

  return (
    <div className="relative rounded-3xl border border-line-2 bg-cream-soft px-[22px] py-6 shadow-[0_8px_20px_-14px_rgba(43,33,24,0.35)]">
      <div className="font-mono text-xs text-brown-light">CASE {pain.no}</div>
      <h3 className="mt-2.5 text-[17px] font-bold leading-[1.5] text-ink text-balance">
        <span aria-hidden="true" className="mr-1 font-a2z text-orange/40">“</span>
        {pain.title}
        <span aria-hidden="true" className="ml-1 font-a2z text-orange/40">”</span>
      </h3>
      <div className="mt-2 text-sm leading-[1.65] text-brown-light">{pain.desc}</div>

      {/* 꼬리 윗변이 본체 테두리를 덮어야 끊김 없이 이어진다. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 28 22"
        className={`absolute left-10 top-[calc(100%-1px)] h-[22px] w-[28px] -scale-x-100 ${tailPosition}`}
      >
        <path d="M4 0 C6 8 5 15 1.5 21 C11 19.5 21 12 28 0 Z" fill="var(--color-cream-soft)" />
        <path
          d="M4 0 C6 8 5 15 1.5 21 C11 19.5 21 12 28 0"
          fill="none"
          stroke="var(--color-line-2)"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function PainPoints() {
  return (
    <section aria-labelledby="painpoints-heading" className="bg-white">
      <div className="mx-auto max-w-[1000px] px-5 pt-10 pb-6 sm:pt-16 sm:pb-[30px] lg:pt-24 lg:pb-10">
        <Reveal className="text-center">
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">PAIN POINT</div>
          <h2
            id="painpoints-heading"
            className="mt-3.5 font-a2z text-[26px] font-extrabold leading-[1.35] tracking-normal text-teal text-balance sm:text-3xl lg:text-[38px]"
          >
            문제집은 많이 푸는데,
            <br />
            왜 영어 점수는 오르지 않을까요?
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-base leading-[1.75] text-brown-light text-balance">
            학습량이 아니라 학습 방향이 문제일 수 있습니다.
            <br />
            아래 상황 중 하나라도 해당된다면 상담을 권합니다.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:mt-12">
          {PAINS.map((pain, i) => (
            <SpeechBubble key={pain.no} pain={pain} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex justify-center sm:mt-[58px] lg:mt-22">
          <img
            src={worriedParent}
            alt="아이 공부를 고민하는 학부모 일러스트"
            width={500}
            height={603}
            loading="lazy"
            decoding="async"
            className="h-auto w-[160px] sm:w-[190px] lg:w-[220px]"
          />
        </Reveal>
      </div>
    </section>
  )
}
