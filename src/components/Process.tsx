import { useId, useState } from 'react'
import Reveal from './Reveal'
import CollapsiblePanel from './CollapsiblePanel'
import useMediaQuery, { BELOW_SM } from '../hooks/useMediaQuery'
import { STEPS } from '../data/content'

export default function Process() {
  const collapsible = useMediaQuery(BELOW_SM)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const panelId = useId()

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-y border-line-2 bg-cream"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal className="max-w-[620px]">
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">LEARNING PROCESS</div>
          <h2
            id="process-heading"
            className="mt-3.5 font-a2z text-[26px] font-bold leading-[1.35] tracking-normal text-teal text-balance sm:text-3xl lg:text-[38px]"
          >
            등록 후 이렇게 관리됩니다
          </h2>
          <p className="mt-3.5 text-base leading-[1.75] text-brown-light">
            레벨 테스트부터 주간 리포트까지, 관리 과정을 학부모께 그대로 공개합니다.
          </p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5"
        >
          {STEPS.map((step, i) => {
            const open = openIndex === i
            const id = `${panelId}-${i}`
            return (
              <div key={step.no} className="rounded-2xl border border-line-3 bg-white px-5 pb-[26px] pt-6">
                {collapsible ? (
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={id}
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="grid size-[34px] flex-none place-items-center rounded-[9px] bg-orange text-sm font-extrabold text-white">
                          {step.no}
                        </span>
                        <span className="text-[17px] font-bold text-ink">{step.title}</span>
                      </span>
                      <span aria-hidden className="flex-none text-xl font-semibold leading-none text-teal">
                        {open ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-[34px] place-items-center rounded-[9px] bg-orange text-sm font-extrabold text-white">
                        {step.no}
                      </div>
                      <div className="font-mono text-[11px] tracking-wider text-brown-light">{step.en}</div>
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold text-ink">{step.title}</h3>
                  </>
                )}
                <CollapsiblePanel
                  id={id}
                  open={open}
                  collapsible={collapsible}
                  className="mt-2 whitespace-pre-line text-sm leading-[1.65] text-brown-light"
                >
                  {step.desc}
                </CollapsiblePanel>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
