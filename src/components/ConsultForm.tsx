import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { GRADE_OPTIONS, PHONE, PHONE_TEL, TIME_OPTIONS } from '../data/content'

const inputClass =
  'min-h-[52px] rounded-[10px] border border-line-4 bg-white px-3.5 text-base text-ink outline-none transition-shadow focus:border-teal focus:ring-2 focus:ring-teal-pale'

/** 02-123-4567, 010-1234-5678, 01012345678 모두 통과시킨다. */
const PHONE_PATTERN = '0\\d{1,2}-?\\d{3,4}-?\\d{4}'

export default function ConsultForm() {
  const [state, setState] = useState<'editing' | 'sending' | 'done'>('editing')
  const statusRef = useRef<HTMLDivElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'sending') return

    setState('sending')
    // 데모라 실제로 전송하지 않는다. 실제 연동 시 이 자리에서 요청을 보내고,
    // 실패하면 setState('editing')으로 되돌린 뒤 오류를 보여주면 된다.
    window.setTimeout(() => {
      setState('done')
      // 결과를 스크린리더 사용자에게도 바로 알린다.
      window.requestAnimationFrame(() => statusRef.current?.focus())
    }, 400)
  }

  return (
    <section id="form" aria-labelledby="form-heading" className="bg-white">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 px-5 py-10 sm:py-16 md:grid-cols-2 lg:gap-14 lg:py-24">
        <Reveal>
          <div className="text-[13px] font-extrabold tracking-[0.1em] text-orange">CONSULTATION</div>
          <h2
            id="form-heading"
            className="mt-3.5 font-a2z text-[26px] font-bold leading-[1.35] tracking-normal text-teal sm:text-[34px]"
          >
            상담 신청
          </h2>
          <p className="mt-4 max-w-[400px] text-base leading-[1.8] text-brown text-balance">
            현재 학습 상황만 알려주시면,
            <br className="hidden sm:block" />
            학년과 학교에 맞는
            <br className="hidden max-sm:block" />
            학습 방향을 먼저 정리해 안내드립니다.
          </p>
          <dl className="mt-7 grid gap-3.5">
            <div className="flex gap-3 text-[15px] text-brown">
              <dt className="min-w-[72px] font-bold text-orange">상담 시간</dt>
              <dd className="m-0">평일 14:00 – 21:00 / 토 10:00 – 17:00</dd>
            </div>
            <div className="flex gap-3 text-[15px] text-brown">
              <dt className="min-w-[72px] font-bold text-orange">소요 시간</dt>
              <dd className="m-0">약 20분 (레벨 테스트 별도 30분)</dd>
            </div>
            <div className="flex gap-3 text-[15px] text-brown">
              <dt className="min-w-[72px] font-bold text-orange">전화 상담</dt>
              <dd className="m-0">
                <a href={PHONE_TEL} className="text-brown hover:text-orange">
                  {PHONE}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal
          delay={0.1}
          as="section"
          className="grid gap-[18px] rounded-[18px] border border-line-3 bg-cream-light p-6 sm:p-8"
        >
          {state === 'done' ? (
            <div
              ref={statusRef}
              role="status"
              tabIndex={-1}
              className="grid content-center justify-items-start gap-4 py-6"
            >
              <div className="text-[19px] font-bold text-teal-deep">신청이 접수되었습니다.</div>
              <p className="m-0 text-base leading-[1.75] text-brown">
                담당자가 순차적으로 연락드립니다.
                <br />
                급하시면 {PHONE}으로 전화 주셔도 됩니다.
              </p>
              <p className="m-0 rounded-[10px] bg-yellow-light px-4 py-3 text-sm font-semibold text-teal-deep">
                이 페이지는 포트폴리오 데모입니다. 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>
              <button
                type="button"
                onClick={() => setState('editing')}
                className="min-h-[52px] rounded-[10px] border border-line-4 bg-white px-6 text-base font-bold text-orange transition-colors hover:border-orange"
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <form className="grid gap-[18px]" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <label htmlFor="pname" className="text-sm font-bold text-ink-soft">
                  학부모 이름
                </label>
                <input
                  id="pname"
                  name="pname"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="홍길동"
                  className={inputClass}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-bold text-ink-soft">
                  연락처
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  pattern={PHONE_PATTERN}
                  title="숫자와 하이픈만 입력해주세요. 예) 010-0000-0000"
                  placeholder="010-0000-0000"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="grade" className="text-sm font-bold text-ink-soft">
                    학생 학년
                  </label>
                  <select id="grade" name="grade" required defaultValue="" className={inputClass}>
                    <option value="">선택해주세요</option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="time" className="text-sm font-bold text-ink-soft">
                    상담 희망 시간
                  </label>
                  <select id="time" name="time" className={inputClass}>
                    {TIME_OPTIONS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="memo" className="text-sm font-bold text-ink-soft">
                  문의 내용 <span className="font-medium text-brown-light">(선택)</span>
                </label>
                <textarea
                  id="memo"
                  name="memo"
                  rows={4}
                  placeholder="현재 학습 상황이나 궁금한 점을 적어주세요."
                  className={`${inputClass} py-3.5 leading-[1.6]`}
                />
              </div>
              <label htmlFor="agree" className="flex items-start gap-2.5 text-sm leading-[1.6] text-brown-light">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                  className="mt-0.5 size-5 accent-orange"
                />
                <span>상담 진행을 위한 개인정보 수집·이용에 동의합니다.</span>
              </label>
              <button
                type="submit"
                disabled={state === 'sending'}
                className="min-h-[58px] rounded-[10px] bg-orange text-[17px] font-bold text-white transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:bg-orange/60"
              >
                {state === 'sending' ? '접수 중…' : '상담 신청하기'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
