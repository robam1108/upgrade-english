import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'
import ButtonLink from './ui/ButtonLink'
import { HERO_FACTS, HERO_PHOTO } from '../data/content'

/** 원을 따라 도는 영문 문구. 버터 원형 모티프를 히어로에서 처음 소개한다. */
function TaglineSticker() {
  const reduce = useReducedMotion()
  return (
    <div className="relative grid size-[118px] place-items-center rounded-full bg-butter text-navy shadow-[0_12px_30px_-12px_rgba(38,59,80,0.35)] sm:size-[148px]">
      <motion.svg
        viewBox="0 0 160 160"
        className="absolute inset-0 size-full"
        aria-hidden
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        <defs>
          <path id="sticker-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <text className="fill-navy font-en text-[13px] font-semibold uppercase tracking-[0.2em]">
          <textPath href="#sticker-circle">Learn today · Lead tomorrow ·</textPath>
        </text>
      </motion.svg>
      <span aria-hidden className="font-en text-[26px] font-extrabold leading-none sm:text-[32px]">
        UP
      </span>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden bg-ivory">
      <div className="container-x grid grid-cols-1 gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal immediate>
            <p className="t-eyebrow flex items-center gap-2.5 text-sky-deep">
              <span aria-hidden className="size-2 rounded-full bg-butter-deep" />
              Learn today, lead tomorrow.
            </p>
          </Reveal>
          <Reveal immediate delay={0.08}>
            <h1 id="hero-heading" className="t-display mt-6 text-navy">
              영어 실력의 차이,
              <br />
              <span className="marker">배움의 방식</span>에서
              <br />
              시작됩니다.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.16}>
            <p className="t-lead mt-7 max-w-[30em] text-ink-soft">
              기초부터 탄탄하게, 아이의 가능성을
              <br className="hidden sm:block" /> 한 단계 더 높이는 영어 교육.
              <span className="mt-1 block text-[15px] font-semibold text-sky-deep">
                초등 4학년부터 중학 3학년까지
              </span>
            </p>
          </Reveal>
          <Reveal immediate delay={0.24} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact">상담 신청하기</ButtonLink>
            <ButtonLink href="#curriculum" variant="ghost">
              교육 과정 보기
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          {/* 사진 뒤 하늘색 판. 사진과 어긋나게 두어 비대칭을 만든다. */}
          <div
            aria-hidden
            className="absolute -right-5 top-8 bottom-[-28px] w-[78%] rounded-[32px] bg-sky-soft sm:-right-8 lg:-right-10 lg:bottom-[-40px] lg:top-14"
          />
          <Reveal immediate delay={0.3} className="relative">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={`${HERO_PHOTO.portrait} 560w, ${HERO_PHOTO.portrait2x} 860w`}
                sizes="(min-width: 1240px) 470px, 38vw"
              />
              <img
                src={HERO_PHOTO.wide}
                srcSet={`${HERO_PHOTO.wide} 750w, ${HERO_PHOTO.wide2x} 1200w`}
                sizes="(min-width: 768px) 700px, 100vw"
                alt={HERO_PHOTO.alt}
                width={1200}
                height={900}
                fetchPriority="high"
                className="aspect-[4/3] w-full rounded-[28px] object-cover lg:aspect-[4/5]"
              />
            </picture>
            <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-ivory/95 px-3.5 py-2 text-[13px] font-bold text-navy backdrop-blur sm:right-5 sm:top-5">
              <span className="font-en text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-deep">
                Small class
              </span>
              한 반 최대 8명
            </span>
          </Reveal>
          <Reveal immediate delay={0.45} className="absolute -bottom-8 left-3 sm:-bottom-10 sm:left-6 lg:-left-14 lg:bottom-14">
            <TaglineSticker />
          </Reveal>
        </div>
      </div>

      <div className="container-x pb-16 lg:pb-24">
        <Reveal immediate delay={0.4}>
          <dl className="m-0 grid grid-cols-1 border-t border-navy/15 sm:grid-cols-3">
            {HERO_FACTS.map((fact, i) => (
              <div
                key={fact.en}
                className={`flex items-baseline justify-between gap-4 border-b border-navy/10 py-4 sm:block sm:border-b-0 sm:py-6 ${
                  i > 0 ? 'sm:border-l sm:border-navy/15 sm:pl-6' : ''
                }`}
              >
                <dt className="t-eyebrow text-ink-mute">{fact.en}</dt>
                <dd className="m-0 text-[16px] font-bold text-navy sm:mt-3 sm:text-[18px]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
