import { useEffect, useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { PHONE, PHONE_TEL } from '../data/content'

/** 버튼 56px + 위아래 여백 20px. 아래 여백 칸과 높이를 맞춘다. */
const BAR_HEIGHT = '76px'

/**
 * 모바일 하단 고정 상담 바.
 *
 * 히어로(상담 버튼이 이미 있다)와 상담 섹션이 화면에 있을 때는 같은 버튼이 두 번 보이므로 숨긴다. 스크롤 위치를 직접 재서,
 * 관찰자 콜백이 오지 않는 환경에서도 바가 엉뚱하게 사라지거나 남지 않게 한다.
 */
export default function FloatingContactButton() {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('top')
    const target = document.getElementById('contact')
    if (!hero || !target) return
    const check = () => {
      const rect = target.getBoundingClientRect()
      const inHero = hero.getBoundingClientRect().bottom > window.innerHeight * 0.5
      setHidden(inHero || (rect.top < window.innerHeight * 0.85 && rect.bottom > 0))
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  return (
    <>
      <nav
        aria-label="빠른 상담"
        aria-hidden={hidden}
        inert={hidden}
        className={`fixed inset-x-0 bottom-0 z-[60] flex gap-2.5 bg-ivory/95 px-4 pt-2.5 shadow-[0_-8px_24px_-12px_rgba(38,59,80,0.25)] backdrop-blur-md transition-transform duration-300 lg:hidden ${
          hidden ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
      >
        <a
          href={PHONE_TEL}
          aria-label={`전화 문의 ${PHONE}`}
          className="grid size-14 shrink-0 place-items-center rounded-[var(--radius-btn)] border border-navy/20 text-navy"
        >
          <Phone aria-hidden className="size-5" />
        </a>
        <a
          href="#contact"
          className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-navy text-[17px] font-bold text-ivory"
        >
          무료 상담 신청
          <ArrowRight aria-hidden className="size-[18px]" />
        </a>
      </nav>
      {/*
        고정 바에 가리는 만큼 페이지 끝에 자리를 비워 둔다. 홈 인디케이터가 있는 기기에서는
        safe-area 만큼 바가 더 높아지므로 그 값까지 같이 계산해야 푸터가 가리지 않는다.
      */}
      <div
        aria-hidden
        className="bg-navy lg:hidden"
        style={{ height: `calc(${BAR_HEIGHT} + env(safe-area-inset-bottom))` }}
      />
    </>
  )
}
