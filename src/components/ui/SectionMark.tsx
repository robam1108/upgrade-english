type SectionMarkProps = {
  index: string
  label: string
  /** 네이비 배경 위에서는 light, 버터 배경 위에서는 navy. */
  tone?: 'dark' | 'light' | 'navy'
  className?: string
}

/**
 * 섹션 머리의 "(02) About — ———" 줄.
 *
 * 모든 섹션이 같은 장치로 시작해서, 레이아웃이 섹션마다 달라도 한 권의 잡지처럼 이어져 보인다.
 */
export default function SectionMark({ index, label, tone = 'dark', className = '' }: SectionMarkProps) {
  const color = { dark: 'text-sky-deep', light: 'text-sky-soft', navy: 'text-navy' }[tone]
  return (
    <div className={`flex items-center gap-3 ${color} ${className}`}>
      <span className="t-eyebrow tnum">({index})</span>
      <span className="t-eyebrow">{label}</span>
      <span aria-hidden className="h-px flex-1 bg-current opacity-30" />
    </div>
  )
}
