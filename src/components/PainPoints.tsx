import Reveal from './Reveal'
import { PAINS } from '../data/content'

export default function PainPoints() {
  return (
    <section aria-labelledby="painpoints-heading" className="bg-white">
      <div className="mx-auto max-w-[1000px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal className="text-center">
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">PAIN POINT</div>
          <h2
            id="painpoints-heading"
            className="mt-3.5 font-a2z text-[26px] font-extrabold leading-[1.35] -tracking-[0.025em] text-teal text-balance sm:text-3xl lg:text-[38px]"
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
        <Reveal delay={0.1} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12">
          {PAINS.map((pain) => (
            <div key={pain.no} className="rounded-2xl border border-line-2 bg-cream-soft px-[22px] py-6">
              <div className="font-mono text-xs text-brown-light">CASE {pain.no}</div>
              <h3 className="mt-2.5 text-[17px] font-bold leading-[1.5] text-ink text-balance">
                {pain.title}
              </h3>
              <div className="mt-2 text-sm leading-[1.65] text-brown-light">{pain.desc}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
