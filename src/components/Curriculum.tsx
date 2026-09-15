import { useId, useRef, useState } from 'react'
import Reveal from './Reveal'
import { CURRICULUM } from '../data/content'

export default function Curriculum() {
  const [activeKey, setActiveKey] = useState(CURRICULUM[1].key) // 중1 default
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  const tabId = (key: string) => `${baseId}-tab-${key}`
  const panelId = (key: string) => `${baseId}-panel-${key}`

  /** 탭 목록 안에서는 좌우 방향키로 이동하는 것이 표준 동작이다. */
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (delta === 0) return
    e.preventDefault()
    const next = (index + delta + CURRICULUM.length) % CURRICULUM.length
    setActiveKey(CURRICULUM[next].key)
    tabsRef.current[next]?.focus()
  }

  return (
    <section id="curriculum" aria-labelledby="curriculum-heading" className="bg-white">
      <div className="mx-auto max-w-[1080px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal>
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">CURRICULUM</div>
          <h2
            id="curriculum-heading"
            className="mt-3.5 font-a2z text-[26px] font-bold leading-[1.35] -tracking-[0.025em] text-teal sm:text-3xl lg:text-[38px]"
          >
            학년별 커리큘럼
          </h2>
          <p className="mt-3.5 max-w-[600px] text-base leading-[1.75] text-brown-light text-balance">
            같은 교재로 같은 진도를 나가지 않습니다.
            <br className="hidden max-sm:block" />
            학년별 목표와 시험 구조에 맞춰 수업을 구성합니다.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div role="tablist" aria-label="학년 선택" className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {CURRICULUM.map((c, i) => {
              const active = c.key === activeKey
              return (
                <button
                  key={c.key}
                  ref={(el) => {
                    tabsRef.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={tabId(c.key)}
                  aria-selected={active}
                  aria-controls={panelId(c.key)}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveKey(c.key)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`min-h-[46px] flex-none rounded-full border px-6 py-3 text-base font-bold transition-colors ${
                    active ? 'border-orange bg-orange text-white' : 'border-line-4 bg-white text-brown'
                  }`}
                >
                  {c.key}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/*
          비활성 학년도 DOM에 남긴다. 조건부 렌더링으로 빼면 모바일 우선 색인에서
          커리큘럼 대부분이 통째로 빠진다. 같은 격자 칸에 겹쳐 두고 visibility로만 감춘다.
        */}
        <div className="mt-5 grid rounded-[18px] border border-line-3 bg-cream-light p-6 shadow-[0_10px_30px_rgba(60,45,25,0.05)] sm:p-8 lg:p-10">
          {CURRICULUM.map((c) => {
            const active = c.key === activeKey
            return (
              <div
                key={c.key}
                role="tabpanel"
                id={panelId(c.key)}
                aria-labelledby={tabId(c.key)}
                className={`col-start-1 row-start-1 transition-[opacity,transform] duration-250 ease-out motion-reduce:transition-none ${
                  active ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-xl font-extrabold -tracking-[0.02em] text-teal sm:text-2xl lg:text-[26px]">
                    {c.heading}
                  </h3>
                  <div className="rounded-full bg-yellow-light px-3 py-1.5 text-sm font-semibold text-orange">
                    {c.badge}
                  </div>
                </div>
                <p className="mt-3 max-w-[700px] text-base leading-[1.75] text-brown">{c.summary}</p>
                <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                  {c.blocks.map((b) => (
                    <div key={b.label} className="bg-white px-5 py-[22px]">
                      <div className="text-xs font-extrabold tracking-wider text-brown-light">{b.label}</div>
                      <div className="mt-2.5 whitespace-pre-line text-[15px] leading-[1.7] text-ink-soft">
                        {b.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
