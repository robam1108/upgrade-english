import { useEffect, useRef, useState } from 'react'
import { ACADEMY_NAME, ADDRESS, COORDS } from '../data/content'

declare global {
  interface Window {
    naver?: any
  }
}

const CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined

type Status = 'missing-key' | 'idle' | 'loading' | 'ready' | 'error'

let scriptPromise: Promise<void> | null = null

// script.onload는 파일을 다 읽은 시점에 불리지만, SDK는 그 뒤에도 내부 인증 절차를 끝내야
// 한다. `callback` 파라미터는 SDK가 완전히 준비된 뒤에만 불리므로 그쪽을 기다린다.
function loadScript(clientId: string): Promise<void> {
  if (window.naver?.maps) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const callbackName = '__onNaverMapsReady'
    ;(window as any)[callbackName] = () => {
      delete (window as any)[callbackName]
      resolve()
    }

    const script = document.createElement('script')
    // 좌표를 상수로 들고 있으므로 geocoder 서브모듈이 필요 없다.
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.async = true
    script.onerror = () => reject(new Error('script load failed'))
    document.head.appendChild(script)
  }).catch((err) => {
    // 실패한 Promise를 남겨 두면 이후 시도가 전부 같은 실패를 돌려받아 재시도가 막힌다.
    scriptPromise = null
    throw err
  })

  return scriptPromise
}

export default function NaverMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>(CLIENT_ID ? 'idle' : 'missing-key')

  // 지도는 페이지 맨 아래에 있다. 첫 로드부터 외부 SDK를 받아 올 이유가 없으므로
  // 화면에 가까워질 때까지 기다린다.
  useEffect(() => {
    if (status !== 'idle') return
    const target = containerRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          setStatus('loading')
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [status])

  useEffect(() => {
    if (status !== 'loading' || !CLIENT_ID) return

    let cancelled = false

    loadScript(CLIENT_ID)
      .then(() => {
        if (cancelled || !containerRef.current) return

        const position = new window.naver.maps.LatLng(COORDS.lat, COORDS.lng)
        const map = new window.naver.maps.Map(containerRef.current, {
          center: position,
          zoom: 16,
        })
        new window.naver.maps.Marker({ position, map, title: ACADEMY_NAME })
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [status])

  const message =
    status === 'missing-key'
      ? ['네이버 지도 API 키가 설정되지 않았습니다', 'VITE_NAVER_MAP_CLIENT_ID를 .env에 입력하세요']
      : status === 'error'
        ? ['지도를 불러오지 못했습니다', ADDRESS]
        : ['지도를 불러오는 중입니다…', ADDRESS]

  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-line-5">
      <div
        ref={containerRef}
        role="img"
        aria-label={`${ACADEMY_NAME} 위치 지도. ${ADDRESS}`}
        className="h-full w-full"
      />
      {status !== 'ready' && (
        <div className="placeholder-hatch absolute inset-0 grid place-items-center">
          <span className="px-4 text-center font-mono text-xs leading-[1.7] text-brown">
            {message[0]}
            <br />
            {message[1]}
          </span>
        </div>
      )}
    </div>
  )
}
