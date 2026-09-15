import Reveal from './Reveal'
import useMediaQuery from '../hooks/useMediaQuery'
import { HERO_STRIP } from '../data/content'
import heroImg from '../assets/hero/hero.webp'

export default function Hero() {
  // 히어로 사진은 md 이상에서만 보인다. `hidden`으로만 감추면 모바일에서도 파일은
  // 그대로 내려받으므로, 아예 렌더링하지 않는다. (장식용이라 색인에도 영향이 없다.)
  const showPhoto = useMediaQuery('(min-width: 768px)')

  return (
    <section id="top" className="border-b border-line-2 bg-gradient-to-b from-cream to-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-8 px-5 py-14 sm:py-16 md:grid-cols-2 md:gap-14 md:py-20 lg:py-24">
        <Reveal className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-light px-4 py-2 text-[15px] font-bold -tracking-tight text-orange">
            초·중등 내신 전문 영어학원
          </div>
          <h1 className="mt-7 text-teal text-balance">
            <span className="font-a2z font-bold leading-[1.35] -tracking-[0.025em] text-[26px] lg:text-[37px]">
              감이 아니라, 데이터로 만드는
            </span>
            <br />
            <span className="mt-[22px] flex items-baseline justify-center gap-2 md:justify-start">
              <span className="font-a2z font-bold text-[36px] lg:text-[50px]">내신</span>
              <span className="font-vibe font-normal text-[78px] lg:text-[108px]">1등급!</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 w-full max-w-[440px] text-base leading-[1.75] text-brown text-balance sm:text-lg md:mx-0">
            학생별 학습 진단부터 학교별
            <br className="hidden max-sm:block" />
            내신 분석, 오답 관리까지.
            <br />
            막연한 공부가 아닌 정확한 공부를 시켜드립니다.
          </p>
          <div className="mx-auto mt-9 flex w-full max-w-[440px] flex-wrap gap-3 md:mx-0">
            <a
              href="#form"
              className="hidden flex-[1_1_180px] items-center justify-center rounded-[10px] bg-orange px-7 py-[17px] text-[17px] font-bold text-white shadow-[0_10px_24px_rgba(194,65,12,0.22)] transition-all hover:bg-orange-dark hover:shadow-[0_14px_30px_rgba(194,65,12,0.32)] md:inline-flex"
            >
              무료 상담
            </a>
            <a
              href="#curriculum"
              className="flex-[1_1_180px] rounded-[10px] border border-line-4 bg-white px-7 py-[17px] text-center text-[17px] font-bold text-orange transition-colors hover:border-orange"
            >
              커리큘럼 보기
            </a>
          </div>
        </Reveal>

        {showPhoto && (
          <Reveal delay={0.1}>
            <div className="h-full min-h-[380px] overflow-hidden rounded-[14px] border border-line-5 shadow-[0_24px_50px_rgba(11,74,67,0.28)]">
              <img
                src={heroImg}
                alt="수업이 진행 중인 강의실"
                width={1200}
                height={900}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        )}
      </div>

      <div className="mx-auto max-w-[1200px] px-5 pb-8 sm:pb-12">
        <Reveal className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {HERO_STRIP.map((item) => (
            <div key={item.no} className="bg-white px-5 py-[22px] text-center sm:text-left">
              <div className="text-[13px] font-bold tracking-wider text-amber">{item.no}</div>
              <div className="mt-2 text-[17px] font-bold text-ink">{item.title}</div>
              <div className="mt-1.5 text-sm leading-[1.6] text-brown-light">{item.desc}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
