import Reveal from './Reveal'
import { PHONE, PHONE_TEL } from '../data/content'

export default function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="bg-orange">
      <div className="mx-auto max-w-[900px] px-5 py-10 text-center sm:py-16 lg:py-24">
        <Reveal>
          <h2
            id="cta-heading"
            className="font-a2z text-[26px] font-extrabold leading-[1.35] -tracking-[0.025em] text-white text-balance sm:text-3xl lg:text-[40px]"
          >
            우리 아이에게 맞는
            <br />
            영어 공부 방법부터 상담해보세요.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-[18px] max-w-[460px] text-base leading-[1.75] text-orange-pale text-balance">
            간단한 상담 신청 후 담당자가 연락드립니다.
            <br />
            레벨 테스트와 상담은 모두 무료입니다.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-[30px] flex flex-wrap justify-center gap-3">
          <a
            href="#form"
            className="rounded-[10px] bg-white px-[30px] py-[17px] text-[17px] font-bold text-orange transition-colors hover:bg-yellow-light"
          >
            무료 상담 신청
          </a>
          <a
            href={PHONE_TEL}
            className="rounded-[10px] border border-white/40 px-[30px] py-[17px] text-[17px] font-bold text-white transition-colors hover:border-white"
          >
            <span className="sr-only">전화 문의 </span>
            {PHONE}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
