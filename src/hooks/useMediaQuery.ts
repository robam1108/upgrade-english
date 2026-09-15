import { useCallback, useSyncExternalStore } from 'react'

/**
 * 미디어 쿼리 결과를 구독한다.
 *
 * resize 리스너 대신 matchMedia를 쓰고, 첫 렌더에서 이미 올바른 값을 돌려주기 때문에
 * 모바일에서 데스크톱 레이아웃이 한 프레임 스쳐 지나가는 일이 없다.
 *
 * 브레이크포인트는 Tailwind와 같은 값을 써야 한다. 그렇지 않으면 JS가 판단한 레이아웃과
 * CSS가 그리는 레이아웃이 어긋난다.
 */
export default function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onStoreChange)
      return () => list.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Tailwind의 `sm` 미만. 아코디언으로 접히는 구간이다. */
export const BELOW_SM = '(max-width: 639.98px)'
