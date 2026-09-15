import Reveal from './Reveal'
import { SPACES } from '../data/content'

export default function Spaces() {
  return (
    <section aria-labelledby="spaces-heading" className="bg-white">
      <div className="mx-auto max-w-[1120px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal className="max-w-[560px]">
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">ACADEMY</div>
          <h2
            id="spaces-heading"
            className="mt-3.5 font-a2z text-[26px] font-bold leading-[1.35] -tracking-[0.025em] text-teal sm:text-3xl lg:text-[38px]"
          >
            학습에 집중할 수 있는 공간
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        >
          {SPACES.map((space) => (
            <div key={space.title} className="w-[62%] flex-none snap-center sm:w-auto">
              <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-line-3">
                <img
                  src={space.photo}
                  srcSet={`${space.photo} 320w, ${space.photo2x} 640w`}
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 62vw"
                  alt={`${space.title} 사진`}
                  width={320}
                  height={213}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-base font-bold text-ink">{space.title}</h3>
              <div className="mt-1 text-sm leading-[1.6] text-brown-light">{space.desc}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
