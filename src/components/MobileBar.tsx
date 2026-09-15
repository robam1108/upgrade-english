import { PHONE_TEL } from '../data/content'

/** 버튼 54px + 위아래 여백 20px + 위쪽 경계선 1px. 아래 여백 칸과 높이를 맞춘다. */
const BAR_HEIGHT = '75px'

export default function MobileBar() {
  return (
    <>
      <nav
        aria-label="빠른 상담"
        className="fixed inset-x-0 bottom-0 z-[60] flex gap-2.5 border-t border-line bg-white/95 px-3 pt-2.5 backdrop-blur-md md:hidden"
        style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
      >
        <a
          href={PHONE_TEL}
          className="flex min-h-[54px] flex-none items-center justify-center rounded-[10px] border border-line-4 px-5 text-base font-bold text-orange"
        >
          전화 문의
        </a>
        <a
          href="#form"
          className="flex min-h-[54px] flex-1 items-center justify-center rounded-[10px] bg-orange text-[17px] font-bold text-white"
        >
          무료 상담 신청
        </a>
      </nav>
      {/*
        고정 바에 가리는 만큼 페이지 끝에 자리를 비워 둔다. 홈 인디케이터가 있는 기기에서는
        safe-area 만큼 바가 더 높아지므로 그 값까지 같이 계산해야 푸터가 가리지 않는다.
      */}
      <div
        aria-hidden
        className="md:hidden"
        style={{ height: `calc(${BAR_HEIGHT} + env(safe-area-inset-bottom))` }}
      />
    </>
  )
}
