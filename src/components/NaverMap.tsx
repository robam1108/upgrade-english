import { useEffect, useRef, useState } from 'react'
import { ACADEMY_NAME, ADDRESS, COORDS } from '../data/content'

declare global {
  interface Window {
    naver?: any
  }
}

const CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined

type Status = 'missing-key' | 'idle' | 'loading' | 'ready' | 'error'

/** 뷰포트에서 이만큼 가까워지면 미리 불러온다. */
const PRELOAD_MARGIN = 400
/** 스크롤을 전혀 하지 않는 방문자에게도 결국 지도를 보여준다. */
const BACKSTOP_MS = 5000

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
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&callback=${callbackName}`
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

  // 지도는 페이지 맨 아래에 있다. 첫 로드부터 외부 SDK(300KB 이상)를 받아 올 이유가 없으므로
  // 가까워질 때까지 미룬다.
  //
  // IntersectionObserver 대신 스크롤 위치를 직접 재는 이유: 관찰자가 어떤 이유로든 콜백을
  // 주지 않으면 지도가 영영 뜨지 않는다. 여기서는 스크롤할 때마다 위치를 확인하고,
  // 그마저 없으면 타이머가 대신 불러오므로 어떤 경우에도 지도가 나온다.
  useEffect(() => {
    if (status !== 'idle') return
    const target = containerRef.current
    if (!target) return

    let backstop = 0

    const stop = () => {
      window.clearTimeout(backstop)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }

    const start = () => {
      stop()
      setStatus('loading')
    }

    function check() {
      const rect = target!.getBoundingClientRect()
      if (rect.top < window.innerHeight + PRELOAD_MARGIN && rect.bottom > -PRELOAD_MARGIN) start()
    }

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    backstop = window.setTimeout(start, BACKSTOP_MS)
    check()

    return stop
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
    <figure className="relative m-0 aspect-[16/11] w-full overflow-hidden rounded-[var(--radius-card)] border border-ivory/10">
      {/* 지도는 조작할 수 있는 위젯이라 이미지로 설명하지 않고, 주소를 글로 함께 둔다. */}
      <figcaption className="sr-only">
        {ACADEMY_NAME} 위치 지도. {ADDRESS}
      </figcaption>
      <div ref={containerRef} className="h-full w-full" />
      {status !== 'ready' && (
        <div className="absolute inset-0 grid place-items-center bg-navy-deep">
          <span className="px-4 text-center font-en text-xs leading-[1.7] text-sky-soft/80">
            {message[0]}
            <br />
            {message[1]}
          </span>
        </div>
      )}
    </figure>
  )
}
