import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '../data/content'

const DESKTOP_LINKS = NAV_LINKS.filter((link) => !link.mobileOnly)
const MOBILE_LINKS = NAV_LINKS.filter((link) => !link.desktopOnly)

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

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
      className="sticky top-0 z-50 border-b border-line-2 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between gap-6 px-5">
        <a href="#top" className="flex shrink-0 items-baseline gap-2">
          <span className="text-[19px] font-extrabold tracking-tight text-orange">UPGRADE</span>
          <span className="text-[19px] font-medium tracking-widest text-teal-light">ENGLISH</span>
        </a>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-[30px] md:flex">
          {DESKTOP_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] font-semibold text-brown hover:text-orange">
              {link.label}
            </a>
          ))}
          <a
            href="#form"
            className="rounded-lg bg-orange px-5 py-[11px] text-[15px] font-bold text-white transition-colors hover:bg-orange-dark"
          >
            무료 상담
          </a>
        </nav>

        <div className="flex items-center gap-2.5 md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-lg border border-line-4 bg-white"
          >
            <span className="relative grid size-[18px] place-items-center">
              <motion.span
                className="absolute block h-0.5 w-[18px] rounded-full bg-orange"
                animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
              <motion.span
                className="absolute block h-0.5 w-[18px] rounded-full bg-orange"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              />
              <motion.span
                className="absolute block h-0.5 w-[18px] rounded-full bg-orange"
                animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="주요 메뉴"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col gap-0.5 overflow-hidden border-t border-line-2 bg-white px-5 pb-5 pt-3 md:hidden"
          >
            {MOBILE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line-2 px-1 py-3.5 text-base font-semibold text-ink-softer"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
