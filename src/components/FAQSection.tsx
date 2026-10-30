import { Plus } from 'lucide-react'
import Reveal from './Reveal'
import SectionMark from './ui/SectionMark'
import { FAQS } from '../data/content'

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-y bg-warm-gray/60">
      <div className="container-x">
        <SectionMark index="06" label="FAQ" />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="faq-heading" className="t-h2 text-navy">
                자주 묻는
                <br />
                질문
              </h2>
              <p className="t-body m-0 mt-4 text-ink-soft">
                더 궁금한 점은 상담에서 편하게 물어봐 주세요.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <ul className="m-0 list-none border-t border-navy/15 p-0">
              {FAQS.map((faq) => (
                <li key={faq.q} className="border-b border-navy/15">
                  {/* <details>는 키보드·스크린리더 지원을 브라우저가 기본으로 제공한다. */}
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-bold text-navy marker:hidden [&::-webkit-details-marker]:hidden sm:text-[18px]">
                      <span className="flex items-baseline gap-4">
                        <span aria-hidden className="font-en text-[14px] font-bold text-sky-deep">
                          Q.
                        </span>
                        {faq.q}
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ivory text-navy transition-colors duration-300 group-open:bg-navy group-open:text-ivory">
                        <Plus aria-hidden className="size-4 transition-transform duration-300 group-open:rotate-45" />
                      </span>
                    </summary>
                    <p className="t-body m-0 max-w-[40em] pb-7 pl-9 pr-12 text-ink-soft">{faq.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
