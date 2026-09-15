import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section'
}

/**
 * 스크롤해서 보일 때 살짝 떠오르는 래퍼.
 *
 * 페이지 거의 모든 블록이 이걸 거치기 때문에, 애니메이션이 끝나지 않으면 페이지 전체가
 * 안 보이는 상태가 된다. 그래서 `opacity: 0`으로 시작하는 경로는 애니메이션을 실제로
 * 돌릴 수 있을 때만 쓰고, 동작을 줄이도록 설정한 환경에서는 처음부터 그냥 보여준다.
 */
export default function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const Component = motion[as]

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px', amount: 0.05 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </Component>
  )
}
