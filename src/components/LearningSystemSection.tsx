import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  ClipboardCheck,
  FileText,
  Lightbulb,
  MessageCircleHeart,
  Repeat,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react'
import Reveal from './Reveal'
import SectionMark from './ui/SectionMark'
import { SYSTEM_STEPS } from '../data/content'

/** 단계가 진행될수록 짙어진다. 마지막 단계는 버터 색으로 마무리한다. */
const NODE_STYLES: { icon: LucideIcon; active: string }[] = [
  { icon: Lightbulb, active: 'bg-sky-soft text-navy' },
  { icon: Repeat, active: 'bg-sky text-navy' },
  { icon: ClipboardCheck, active: 'bg-[#5ea6d1] text-navy' },
  { icon: MessageCircleHeart, active: 'bg-butter text-navy' },
]

export default function LearningSystemSection() {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLOListElement>(null)
  // 타임라인이 화면 아래쪽에 들어올 때 시작해서, 화면 가운데를 지날 때 다 채운다.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })
  const [active, setActive] = useState(reduce ? SYSTEM_STEPS.length - 1 : -1)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return
    // 0, 1/3, 2/3, 1 지점을 지날 때마다 한 단계씩 켠다.
    const next = v <= 0.02 ? -1 : Math.min(SYSTEM_STEPS.length - 1, Math.floor(v * (SYSTEM_STEPS.length - 1) + 0.15))
    setActive(next)
  })

  const fill = reduce ? 1 : progress

  return (
    <section id="system" aria-labelledby="system-heading" className="section-y relative overflow-hidden bg-navy text-ivory">
      {/* 오른쪽 위로 걸친 큰 원. 버터 원형 모티프를 네이비 위에서 윤곽선으로 변주한다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[420px] rounded-full border border-sky/20 lg:size-[560px]"
      />

      <div className="container-x relative">
        <SectionMark index="03" label="Learning System" tone="light" />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 id="system-heading" className="t-h2 text-ivory">
              배우는 것에서 끝나지 않고,
              <br />
              <span className="text-butter">성장하는 과정</span>까지 관리합니다.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="t-body m-0 max-w-[28em] text-sky-soft/85 lg:ml-auto">
              모든 수업은 네 단계를 한 바퀴로 돌아갑니다. 피드백에서 정한 방향이 다음 수업의 출발점이 됩니다.
            </p>
          </Reveal>
        </div>

        <ol
          ref={trackRef}
          className="relative m-0 mt-16 grid list-none grid-cols-1 gap-10 p-0 lg:mt-24 lg:grid-cols-4 lg:gap-6"
        >
          {/* 연결선: 모바일은 세로, 데스크톱은 가로. 바탕선 위에 진행선이 채워진다. */}
          <div aria-hidden className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-ivory/15 lg:hidden">
            <motion.div className="size-full origin-top bg-sky" style={{ scaleY: fill }} />
          </div>
          <div
            aria-hidden
            className="absolute left-7 right-[calc(25%_-_1.125rem_-_28px)] top-[27px] hidden h-0.5 bg-ivory/15 lg:block"
          >
            <motion.div className="size-full origin-left bg-gradient-to-r from-sky-soft via-sky to-butter" style={{ scaleX: fill }} />
          </div>

          {SYSTEM_STEPS.map((step, i) => {
            const { icon: Icon, active: activeStyle } = NODE_STYLES[i]
            const on = i <= active
            return (
              <li key={step.no} className="relative grid grid-cols-[56px_1fr] gap-x-5 lg:block">
                <span
                  className={`relative z-10 grid size-14 place-items-center rounded-full border-2 transition-all duration-500 ${
                    on ? `${activeStyle} scale-100 border-transparent` : 'scale-90 border-ivory/25 bg-navy text-sky-soft/70'
                  }`}
                >
                  <Icon aria-hidden className="size-6" strokeWidth={1.9} />
                </span>
                <div className={`transition-opacity duration-500 lg:mt-8 ${on ? 'opacity-100' : 'opacity-55'}`}>
                  <p className="m-0 flex items-baseline gap-3">
                    <span className="font-en text-[13px] font-bold text-sky tnum">{step.no}</span>
                    <span className="font-en text-[30px] font-bold leading-none tracking-[-0.03em] text-ivory lg:text-[40px]">
                      {step.en.toUpperCase()}
                    </span>
                  </p>
                  <h3 className="t-h3 mt-3 text-ivory lg:mt-4">{step.title}</h3>
                  <p className="m-0 mt-2 max-w-[22em] t-small text-sky-soft/80">{step.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <Reveal className="mt-14 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-12">
          <div className="flex items-start gap-4 rounded-[var(--radius-card)] bg-ivory/[0.06] p-6 lg:col-span-7 lg:p-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-butter text-navy">
              <FileText aria-hidden className="size-5" />
            </span>
            <div>
              <p className="m-0 text-[17px] font-bold text-ivory">매주 학습 리포트로 학부모님께 공유합니다</p>
              <p className="m-0 mt-1.5 t-small text-sky-soft/80">
                출결, 과제, 단어 시험, 오답 현황을 정리해 보내드립니다. 집에서도 아이의 학습 흐름을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-ivory/15 p-6 lg:col-span-5 lg:p-8">
            <RotateCcw aria-hidden className="size-5 shrink-0 text-butter" />
            <p className="m-0 t-small text-sky-soft/90">
              <span className="font-en font-bold text-ivory">FEEDBACK → LEARN</span>
              <br />
              피드백 결과는 다음 수업의 교재와 진도에 바로 반영됩니다.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
