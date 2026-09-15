import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import useMediaQuery from '../hooks/useMediaQuery'
import { REVIEWS } from '../data/content'

/**
 * 한 번에 보여줄 후기 개수.
 *
 * 브레이크포인트는 아래 격자의 `sm:` / `lg:`와 반드시 같아야 한다. 어긋나면 칸은 3개인데
 * 카드는 2장만 그려지는 식으로 빈 칸이 생긴다.
 */
function usePerView() {
  const threeUp = useMediaQuery('(min-width: 1024px)')
  const twoUp = useMediaQuery('(min-width: 640px)')
  return threeUp ? 3 : twoUp ? 2 : 1
}

export default function Reviews() {
  const perView = usePerView()
  const [index, setIndex] = useState(0)

  const visible = new Set(
    Array.from({ length: perView }, (_, i) => (index + i) % REVIEWS.length),
  )

  return (
    <section aria-labelledby="reviews-heading" className="border-t border-line-2 bg-cream">
      <div className="mx-auto max-w-[1120px] px-5 py-10 sm:py-16 lg:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">REVIEWS</div>
            <h2
              id="reviews-heading"
              className="mt-3.5 font-a2z text-[26px] font-bold leading-[1.35] -tracking-[0.025em] text-teal sm:text-3xl lg:text-[38px]"
            >
              학생·학부모 후기
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p aria-live="polite" className="text-sm font-semibold tabular-nums text-brown">
              <span className="sr-only">후기 </span>
              {index + 1} / {REVIEWS.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
                aria-label="이전 후기"
                aria-controls="reviews-list"
                className="grid size-[46px] place-items-center rounded-[10px] border border-line-4 bg-white text-lg text-orange transition-colors hover:border-orange"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % REVIEWS.length)}
                aria-label="다음 후기"
                aria-controls="reviews-list"
                className="grid size-[46px] place-items-center rounded-[10px] border border-line-4 bg-white text-lg text-orange transition-colors hover:border-orange"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </Reveal>
        {/*
          후기는 전부 DOM에 남기고, 지금 보여줄 것만 노출한다. 보이는 것만 렌더링하면
          좁은 화면에서 후기 다섯 중 하나만 색인된다.
        */}
        <motion.div
          key={index}
          id="reviews-list"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
        >
          {REVIEWS.map((review, i) => (
            <figure
              key={review.author}
              hidden={!visible.has(i)}
              className="m-0 rounded-2xl border border-line-3 bg-white px-6 py-7"
            >
              <div className="text-[15px] font-bold text-teal">{review.tag}</div>
              <blockquote className="mt-3.5 text-base leading-[1.8] text-ink-soft text-balance">
                {review.body}
              </blockquote>
              <figcaption className="mt-[18px] border-t border-line-2 pt-4 text-sm text-brown-light">
                {review.author}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
