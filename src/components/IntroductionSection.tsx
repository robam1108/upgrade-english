import { Layers, TrendingUp, UserRoundCheck, type LucideIcon } from 'lucide-react'
import Reveal from './Reveal'
import SectionMark from './ui/SectionMark'
import { VALUES } from '../data/content'

/**
 * 세 가치는 아래 선을 맞춘 채 오른쪽으로 갈수록 높아지는 막대처럼 놓는다(모바일은 오른쪽으로 한 칸씩 들여 쓴 계단).
 * 카드를 같은 크기로 나열하는 대신 "성장"이라는 메시지를 배치 자체로 보여주려는 것.
 */
const STYLES: { icon: LucideIcon; card: string; lift: string; badge: string }[] = [
  { icon: Layers, card: 'bg-sky-soft', lift: 'sm:col-span-2 lg:col-span-4 lg:min-h-[320px]', badge: 'bg-ivory text-sky-deep' },
  { icon: UserRoundCheck, card: 'bg-butter-soft', lift: 'ml-6 sm:ml-0 lg:col-span-4 lg:min-h-[390px]', badge: 'bg-butter text-navy' },
  { icon: TrendingUp, card: 'bg-warm-gray', lift: 'ml-12 sm:ml-0 lg:col-span-4 lg:min-h-[460px]', badge: 'bg-navy text-ivory' },
]

export default function IntroductionSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y bg-ivory pt-0 lg:pt-0">
      <div className="container-x">
        <SectionMark index="01" label="Our Philosophy" />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <h2 id="about-heading" className="t-h2 text-navy">
              아이마다 배우는 속도는 다르지만,
              <br className="hidden sm:block" /> 성장할 수 있는 가능성은
              <br className="hidden sm:block" /> <span className="text-sky-deep">모두에게 있습니다.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4">
            <p className="t-body m-0 max-w-[26em] text-ink-soft lg:ml-auto">
              UPGRADE ENGLISH는 진도를 먼저 정하지 않습니다. 아이가 지금 어디에 서 있는지 확인하고,
              거기서부터 한 계단씩 올라갑니다.
            </p>
          </Reveal>
        </div>

        <ol className="m-0 mt-14 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:items-end lg:gap-5">
          {VALUES.map((value, i) => {
            const style = STYLES[i]
            const Icon = style.icon
            return (
              <Reveal
                key={value.no}
                as="li"
                delay={i * 0.1}
                className={`${style.card} ${style.lift} flex flex-col rounded-[var(--radius-card)] p-6 sm:p-8`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-en text-[44px] font-bold leading-none tracking-[-0.04em] text-navy tnum sm:text-[56px] lg:text-[64px]">
                    {value.no}
                  </span>
                  <span className={`grid size-12 place-items-center rounded-full ${style.badge}`}>
                    <Icon aria-hidden className="size-[22px]" strokeWidth={1.9} />
                  </span>
                </div>
                <div className="mt-auto pt-8 lg:pt-12">
                  <p className="t-eyebrow m-0 text-ink-mute">{value.en}</p>
                  <h3 className="t-h3 mt-3 text-navy">{value.title}</h3>
                  <p className="t-body m-0 mt-2 font-medium text-navy">{value.desc}</p>
                  <p className="m-0 mt-1 t-small text-ink-soft">{value.detail}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
