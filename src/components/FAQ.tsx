import { useId, useState } from 'react'
import Reveal from './Reveal'
import CollapsiblePanel from './CollapsiblePanel'
import { FAQS } from '../data/content'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  return (
    <section aria-labelledby="faq-heading" className="border-t border-line-2 bg-cream-light">
      <div className="mx-auto max-w-[820px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal className="text-center">
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">FAQ</div>
          <h2
            id="faq-heading"
            className="mt-3.5 font-a2z text-[26px] font-bold leading-[1.35] -tracking-[0.025em] text-teal sm:text-3xl lg:text-[38px]"
          >
            자주 묻는 질문
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 border-t border-line-3">
          {FAQS.map((faq, i) => {
            const open = openIndex === i
            const id = `${baseId}-${i}`
            return (
              <div key={faq.q} className="border-b border-line-3">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={id}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-1 py-5 text-left"
                  >
                    <span className="text-[17px] font-bold text-ink text-balance">{faq.q}</span>
                    <span aria-hidden className="flex-none text-xl font-semibold leading-none text-teal">
                      {open ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                {/* 답변은 접혀 있어도 DOM에 남겨 검색엔진이 읽을 수 있게 한다. */}
                <CollapsiblePanel
                  id={id}
                  open={open}
                  collapsible
                  className="max-w-[640px] px-1 pb-6 text-base leading-[1.8] text-brown text-balance"
                >
                  {faq.a}
                </CollapsiblePanel>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
