import { ADDRESS, NAV_LINKS, OPENING_HOURS, PHONE, PHONE_TEL } from '../data/content'
import { Wordmark } from './Header'
import NaverMap from './NaverMap'

export default function Footer() {
  return (
    <footer id="location" className="bg-navy text-ivory">
      <h2 className="sr-only">오시는 길과 학원 정보</h2>
      <div className="container-x grid grid-cols-1 gap-12 pb-10 pt-16 lg:grid-cols-12 lg:gap-14 lg:pt-24">
        <div className="lg:col-span-5">
          <Wordmark tone="light" />
          <p className="m-0 mt-6 max-w-[22em] font-en text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-sky-soft">
            Learn today,
            <br />
            <span className="text-butter">lead tomorrow.</span>
          </p>

          <address className="mt-10 grid gap-2 text-[15px] not-italic leading-[1.7] text-sky-soft/85">
            <span>{ADDRESS}</span>
            <a href={PHONE_TEL} className="inline-flex min-h-11 w-fit items-center font-en font-semibold text-ivory tnum hover:underline">
              {PHONE}
            </a>
          </address>
          <dl className="m-0 mt-4 grid grid-cols-[64px_1fr] gap-y-1 text-[15px] text-sky-soft/85">
            {OPENING_HOURS.map((slot) => (
              <div key={slot.days} className="contents">
                <dt className="font-semibold text-ivory">{slot.days}</dt>
                <dd className="m-0 tnum">{slot.hours}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="바닥글 메뉴" className="mt-10">
            <ul className="m-0 flex list-none flex-wrap gap-x-5 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-11 items-center text-[14px] font-semibold text-sky-soft/85 hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="lg:col-span-7">
          <NaverMap />
        </div>
      </div>
      <div className="container-x border-t border-ivory/10 pb-10 pt-6">
        <p className="m-0 font-en text-[12px] leading-[1.7] text-sky-soft/65">
          사업자등록번호 000-00-00000 · 대표 ○○○
          <br />
          본 페이지는 포트폴리오용 가상 브랜드이며, 사업자 정보와 강사 정보는 실제 정보가 아닙니다.
          {/*
            실제로 운영한다면 여기에 개인정보처리방침·이용약관 페이지 링크가 들어가야 한다.
            데모에는 해당 페이지가 없으므로 빈 링크를 두지 않았다.
          */}
        </p>
      </div>
    </footer>
  )
}
