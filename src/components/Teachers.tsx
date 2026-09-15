import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { TEACHERS } from '../data/content'

export default function Teachers() {
  return (
    <section id="teachers" aria-labelledby="teachers-heading" className="bg-white">
      <div className="mx-auto max-w-[1120px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal>
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">TEACHERS</div>
          <h2
            id="teachers-heading"
            className="mt-3.5 font-a2z text-[26px] font-bold leading-[1.35] -tracking-[0.025em] text-teal sm:text-3xl lg:text-[38px]"
          >
            담당 강사진
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="-mx-5 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          {TEACHERS.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ boxShadow: '0 14px 34px rgba(60,45,25,0.10)' }}
              className="w-[80%] flex-none snap-center overflow-hidden rounded-2xl border border-line-3 bg-white sm:w-auto"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={t.photo}
                  srcSet={`${t.photo} 400w, ${t.photo2x} 800w`}
                  sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 80vw"
                  alt={`${t.name} 사진`}
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
              <div className="px-5 pb-6 pt-[22px]">
                <div className="text-[13px] font-bold text-teal">{t.role}</div>
                <h3 className="mt-2 text-lg font-extrabold -tracking-tight text-ink sm:text-[19px]">
                  {t.name}
                </h3>
                <div className="mt-1 text-sm font-semibold text-brown-light">{t.field}</div>
                <div className="mt-3 border-t border-line-2 pt-3.5 text-sm leading-[1.7] text-brown text-balance">
                  {t.bio}
                </div>
              </div>
            </motion.div>
          ))}
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 font-mono text-xs text-brown-light">※ 포트폴리오용 가상 정보입니다.</p>
        </Reveal>
      </div>
    </section>
  )
}
