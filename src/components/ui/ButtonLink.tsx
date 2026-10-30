import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

const VARIANTS = {
  primary: 'bg-navy text-ivory hover:bg-navy-deep',
  accent: 'bg-butter text-navy hover:bg-butter-deep',
  ghost: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.04]',
  light: 'border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory/[0.06]',
}

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: keyof typeof VARIANTS
  className?: string
  arrow?: boolean
}

/** 링크 버튼. 화살표는 마우스를 올리면 살짝 앞으로 나간다. 터치 기기에서도 같은 모양 그대로 보인다. */
export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  arrow = true,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-[var(--radius-btn)] px-7 text-[16px] font-bold transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1"
          strokeWidth={2.25}
        />
      )}
    </a>
  )
}
