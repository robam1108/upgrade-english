import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { NAV_LINKS, PHONE, PHONE_TEL } from '../data/content'

export function Wordmark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const main = tone === 'light' ? 'text-ivory' : 'text-navy'
  return (
    <span className={`inline-flex items-center gap-2 ${main}`}>
      {/* 버터 원형은 페이지 곳곳에 반복되는 브랜드 모티프다. */}
      <span aria-hidden className="size-3 rounded-full bg-butter" />
      <span className="font-en text-[17px] font-extrabold tracking-[-0.01em]">UPGRADE</span>
      <span className="font-en text-[17px] font-medium tracking-[0.18em] opacity-70">ENGLISH</span>
    </span>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b bg-ivory/90 backdrop-blur-md transition-colors duration-300 ${
        scrolled || menuOpen ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="#top" aria-label="UPGRADE ENGLISH 처음으로" className="inline-flex min-h-11 items-center">
          <Wordmark />
        </a>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[15px] font-semibold text-ink-soft transition-colors hover:bg-sky-soft hover:text-navy"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="group ml-3 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-navy px-5 py-3 text-[15px] font-bold text-ivory transition-colors hover:bg-navy-deep"
          >
            상담 문의
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="grid size-12 place-items-center rounded-full bg-navy text-ivory lg:hidden"
        >
          <span className="relative grid size-[18px] place-items-center">
            <motion.span
              className="absolute block h-0.5 w-[18px] rounded-full bg-current"
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
            <motion.span
              className="absolute block h-0.5 w-[18px] rounded-full bg-current"
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="주요 메뉴"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-ivory lg:hidden"
          >
            <div className="container-x pb-7 pt-2">
              <ul className="m-0 list-none p-0">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href} className="border-b border-line">
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-[18px] text-[19px] font-bold text-navy"
                    >
                      {link.label}
                      <span className="font-en text-[13px] font-medium text-ink-mute tnum">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-[auto_1fr] gap-2.5">
                <a
                  href={PHONE_TEL}
                  aria-label={`전화 문의 ${PHONE}`}
                  className="grid size-14 place-items-center rounded-[var(--radius-btn)] border border-navy/20 text-navy"
                >
                  <Phone aria-hidden className="size-5" />
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-navy text-[17px] font-bold text-ivory"
                >
                  상담 문의하기
                  <ArrowRight aria-hidden className="size-[18px]" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
