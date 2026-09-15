import type { ReactNode } from 'react'

type CollapsiblePanelProps = {
  id: string
  /** 접힌 상태인지. `collapsible`이 false면 무시된다. */
  open: boolean
  /** 좁은 화면에서만 접는다. 넓은 화면에서는 그냥 펼쳐 둔 블록이다. */
  collapsible: boolean
  className?: string
  children: ReactNode
}

/**
 * 아코디언 본문.
 *
 * 접혀 있을 때도 내용을 DOM에 그대로 남긴다. 조건부 렌더링으로 걷어내면 모바일 우선
 * 색인에서 본문이 통째로 빠지기 때문이다. 대신 `visibility`로 감춰 탭 순서와
 * 스크린리더에서 빠지게 한다.
 *
 * 높이 전환은 grid-template-rows 0fr → 1fr 로 한다. 내용 높이를 재지 않아도 되고,
 * 요소를 마운트/언마운트하지 않아 DOM이 유지된다.
 */
export default function CollapsiblePanel({
  id,
  open,
  collapsible,
  className,
  children,
}: CollapsiblePanelProps) {
  if (!collapsible) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div
      id={id}
      className={`grid transition-[grid-template-rows,visibility] duration-300 ease-in-out motion-reduce:transition-none ${
        open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}
