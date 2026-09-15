import { ADDRESS, OPENING_HOURS, PHONE, PHONE_TEL } from '../data/content'
import NaverMap from './NaverMap'

export default function Footer() {
  return (
    <footer id="location" className="border-t border-line bg-cream">
      <h2 className="sr-only">오시는 길과 학원 정보</h2>
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-5 pb-8 pt-12 sm:grid-cols-2 sm:pb-12 sm:pt-16 lg:gap-12 lg:pt-20">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-orange">UPGRADE</span>
            <span className="text-lg font-medium tracking-widest text-teal-light">ENGLISH</span>
          </div>
          <address className="mt-[18px] grid gap-2.5 text-[15px] not-italic leading-[1.6] text-brown">
            <div>{ADDRESS}</div>
            <div>
              <a href={PHONE_TEL} className="text-brown hover:text-orange">
                {PHONE}
              </a>
            </div>
          </address>
          <dl className="mt-2.5 grid gap-2.5 text-[15px] leading-[1.6] text-brown">
            {OPENING_HOURS.map((slot) => (
              <div key={slot.days} className="flex gap-2">
                <dt className="min-w-[56px] font-semibold">{slot.days}</dt>
                <dd className="m-0">{slot.hours}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2.5 text-[15px] leading-[1.6] text-brown">
            건물 지하 주차 2시간 무료 (상담 시 안내)
          </p>
          <div className="mt-[22px] font-mono text-xs leading-[1.7] text-brown-light">
            사업자등록번호 000-00-00000 · 대표 ○○○
            <br />
            본 페이지는 포트폴리오용 가상 브랜드이며, 사업자 정보와 후기는 실제 정보가 아닙니다.
            {/*
              실제로 운영한다면 여기에 개인정보처리방침·이용약관 페이지 링크가 들어가야 한다.
              데모에는 해당 페이지가 없으므로 빈 링크를 두지 않았다.
            */}
          </div>
        </div>
        <div>
          <NaverMap />
        </div>
      </div>
    </footer>
  )
}
