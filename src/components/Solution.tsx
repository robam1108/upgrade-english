import { useId, useState } from 'react'
import Reveal from './Reveal'
import CollapsiblePanel from './CollapsiblePanel'
import useMediaQuery, { BELOW_SM } from '../hooks/useMediaQuery'
import { SOLUTIONS } from '../data/content'

export default function Solution() {
  // 좁은 화면에서만 접는다. 설명 자체는 어느 화면에서든 DOM에 남는다.
  const collapsible = useMediaQuery(BELOW_SM)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const panelId = useId()

  return (
    <section id="about" aria-labelledby="solution-heading" className="bg-teal text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal className="grid grid-cols-1 gap-6">
          <div>
            <div className="text-[13px] font-extrabold tracking-[0.1em] text-yellow-pale">SOLUTION</div>
            <h2
              id="solution-heading"
              className="mt-3.5 font-a2z text-[26px] font-extrabold leading-[1.35] tracking-normal text-white text-balance sm:text-3xl lg:text-[38px]"
            >
              UPGRADE는 공부의 양보다
              <br className="hidden sm:block" />
              공부의 방향을 관리합니다.
            </h2>
            <p className="mt-4 max-w-[420px] text-base leading-[1.8] text-teal-pale text-balance">
              학생마다 막히는 지점이 다릅니다. 진단으로 시작해
              <br />
              주간 리포트로 확인하는 4단계 관리 구조를 운영합니다.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {SOLUTIONS.map((s, i) => {
            const open = openIndex === i
            const id = `${panelId}-${i}`
            return (
              <div
                key={s.no}
                className="rounded-2xl border border-white/[0.14] bg-white/[0.06] px-[22px] pb-7 pt-[26px] transition-colors hover:bg-white/10"
              >
                {collapsible ? (
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={id}
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="text-[22px] font-extrabold -tracking-tight text-yellow-pale">{s.no}</span>
                        <span className="text-[17px] font-bold text-white">{s.title}</span>
                      </span>
                      <span aria-hidden className="flex-none text-xl font-semibold leading-none text-yellow-pale">
                        {open ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                ) : (
                  <>
                    <div className="text-[22px] font-extrabold -tracking-tight text-yellow-pale">{s.no}</div>
                    <h3 className="mt-3.5 text-[19px] font-bold text-white">{s.title}</h3>
                  </>
                )}
                <CollapsiblePanel
                  id={id}
                  open={open}
                  collapsible={collapsible}
                  className="mt-2.5 text-sm leading-[1.7] text-teal-pale"
                >
                  {s.desc}
                </CollapsiblePanel>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
