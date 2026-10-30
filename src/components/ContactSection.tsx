import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import Reveal from './Reveal'
import SectionMark from './ui/SectionMark'
import { ADDRESS, GRADE_OPTIONS, OPENING_HOURS, PHONE, PHONE_TEL } from '../data/content'

/** 02-123-4567, 010-1234-5678, 01012345678 모두 통과시킨다. */
const PHONE_RE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/

type Field = 'pname' | 'phone' | 'grade' | 'agree'
type Errors = Partial<Record<Field, string>>

function validate(form: HTMLFormElement): Errors {
  const data = new FormData(form)
  const errors: Errors = {}
  const name = String(data.get('pname') ?? '').trim()
  const phone = String(data.get('phone') ?? '').trim()
  if (name.length < 2) errors.pname = '학부모 성함을 2자 이상 입력해 주세요.'
  if (!phone) errors.phone = '연락받으실 번호를 입력해 주세요.'
  else if (!PHONE_RE.test(phone)) errors.phone = '번호 형식을 확인해 주세요. 예) 010-1234-5678'
  if (!data.get('grade')) errors.grade = '자녀 학년을 선택해 주세요.'
  if (!data.get('agree')) errors.agree = '개인정보 수집·이용에 동의해 주셔야 상담을 신청할 수 있습니다.'
  return errors
}

const inputClass =
  'min-h-14 w-full rounded-[var(--radius-btn)] border bg-white px-4 text-[16px] text-navy outline-none transition-[border-color,box-shadow] placeholder:text-ink-mute/70 focus:border-navy focus:ring-4 focus:ring-sky/40'

function borderFor(error?: string) {
  return error ? 'border-[#b42318]' : 'border-line'
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="m-0 text-[13px] font-semibold text-[#b42318]">
      {message}
    </p>
  )
}

function ContactForm() {
  const [state, setState] = useState<'editing' | 'sending' | 'done'>('editing')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // 한 번 제출을 시도한 뒤에는 고칠 때마다 바로 다시 검사해, 오류 문구가 남아 있지 않게 한다.
  const revalidate = () => {
    if (submitted && formRef.current) setErrors(validate(formRef.current))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'sending') return
    setSubmitted(true)

    const found = validate(e.currentTarget)
    setErrors(found)
    const first = (Object.keys(found) as Field[])[0]
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setState('sending')
    // 데모라 실제로 전송하지 않는다. 실제 연동 시 이 자리에서 요청을 보내고,
    // 실패하면 setState('editing')으로 되돌린 뒤 오류를 보여주면 된다.
    window.setTimeout(() => {
      setState('done')
      // 결과를 스크린리더 사용자에게도 바로 알린다.
      window.requestAnimationFrame(() => statusRef.current?.focus())
    }, 500)
  }

  if (state === 'done') {
    return (
      <div ref={statusRef} role="status" tabIndex={-1} className="grid justify-items-start gap-5 py-6 outline-none">
        <span className="grid size-14 place-items-center rounded-full bg-sky-soft font-en text-[22px] font-bold text-navy">
          ✓
        </span>
        <p className="t-h3 m-0 text-navy">데모 신청 화면입니다.</p>
        <p className="m-0 rounded-[14px] bg-butter-soft px-4 py-3.5 text-[15px] font-semibold leading-[1.65] text-navy">
          이 페이지는 포트폴리오 데모라 상담이 실제로 접수되지 않았습니다. 입력하신 내용은 어디에도 저장되거나
          전송되지 않습니다.
        </p>
        <p className="m-0 t-small text-ink-soft">
          실제 운영 시에는 이 자리에서 담당자 연락 안내가 표시됩니다.
        </p>
        <button
          type="button"
          onClick={() => {
            setState('editing')
            setSubmitted(false)
            setErrors({})
          }}
          className="min-h-12 rounded-[var(--radius-btn)] border border-navy/25 px-6 text-[15px] font-bold text-navy transition-colors hover:border-navy"
        >
          처음으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onChange={revalidate} className="grid gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="pname" className="text-[14px] font-bold text-navy">
            학부모 성함
          </label>
          <input
            id="pname"
            name="pname"
            type="text"
            autoComplete="name"
            placeholder="홍길동"
            aria-invalid={!!errors.pname}
            aria-describedby={errors.pname ? 'pname-error' : undefined}
            className={`${inputClass} ${borderFor(errors.pname)}`}
          />
          <ErrorText id="pname-error" message={errors.pname} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-[14px] font-bold text-navy">
            연락처
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="010-0000-0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`${inputClass} ${borderFor(errors.phone)}`}
          />
          <ErrorText id="phone-error" message={errors.phone} />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="grade" className="text-[14px] font-bold text-navy">
          자녀 학년
        </label>
        <select
          id="grade"
          name="grade"
          defaultValue=""
          aria-invalid={!!errors.grade}
          aria-describedby={errors.grade ? 'grade-error' : undefined}
          className={`${inputClass} ${borderFor(errors.grade)} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23263b50'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_16px_center] bg-no-repeat pr-12`}
        >
          <option value="" disabled>
            학년을 선택해 주세요
          </option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <ErrorText id="grade-error" message={errors.grade} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="memo" className="text-[14px] font-bold text-navy">
          상담 내용 <span className="font-medium text-ink-mute">(선택)</span>
        </label>
        <textarea
          id="memo"
          name="memo"
          rows={4}
          placeholder="현재 학습 상황이나 궁금한 점을 적어 주세요."
          className={`${inputClass} border-line py-3.5 leading-[1.6]`}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="agree" className="flex cursor-pointer items-start gap-3 t-small text-navy">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            aria-invalid={!!errors.agree}
            aria-describedby={errors.agree ? 'agree-error agree-detail' : 'agree-detail'}
            className="mt-0.5 size-5 shrink-0 accent-navy"
          />
          <span className="font-semibold">개인정보 수집 및 이용에 동의합니다. (필수)</span>
        </label>
        <p id="agree-detail" className="m-0 pl-8 text-[13px] leading-[1.6] text-ink-mute">
          수집 항목: 성함, 연락처, 자녀 학년, 상담 내용 · 이용 목적: 상담 안내
        </p>
        <ErrorText id="agree-error" message={errors.agree} />
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="group mt-1 inline-flex min-h-[60px] items-center justify-center gap-2.5 rounded-[var(--radius-btn)] bg-navy text-[17px] font-bold text-ivory transition-colors duration-300 hover:bg-navy-deep disabled:cursor-wait disabled:opacity-70"
      >
        {state === 'sending' ? '신청 중…' : '상담 신청하기'}
        <ArrowRight aria-hidden className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <p className="m-0 text-center text-[13px] text-ink-mute">포트폴리오 데모 페이지입니다. 입력 내용은 전송되지 않습니다.</p>
    </form>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-y relative overflow-hidden bg-butter">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-[-180px] size-[420px] rounded-full bg-butter-soft/70"
      />
      <div className="container-x relative">
        <SectionMark index="07" label="Contact" tone="navy" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <h2 id="contact-heading" className="t-h2 text-navy">
                우리 아이의 영어 성장,
                <br />
                함께 시작해 볼까요?
              </h2>
              <p className="t-lead m-0 mt-5 text-navy/80">아이에게 맞는 학습 방향을 상담해 드립니다.</p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="m-0 mt-10 list-none divide-y divide-navy/15 border-y border-navy/15 p-0">
                <li className="flex items-start gap-4 py-5">
                  <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="t-eyebrow m-0 text-navy/70">Call</p>
                    <a href={PHONE_TEL} className="mt-1 inline-flex min-h-11 items-center font-en text-[22px] font-bold text-navy tnum hover:underline">
                      {PHONE}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 py-5">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="t-eyebrow m-0 text-navy/70">Visit</p>
                    <p className="m-0 mt-2 text-[16px] font-semibold text-navy">{ADDRESS}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 py-5">
                  <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="t-eyebrow m-0 text-navy/70">Hours</p>
                    <dl className="m-0 mt-2 grid grid-cols-[64px_1fr] gap-y-1 text-[15px] text-navy">
                      {OPENING_HOURS.map((slot) => (
                        <div key={slot.days} className="contents">
                          <dt className="font-semibold">{slot.days}</dt>
                          <dd className="m-0 tnum">{slot.hours}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
                <li className="flex items-start gap-4 py-5">
                  <MessageCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <p className="t-eyebrow m-0 text-navy/70">KakaoTalk</p>
                    {/* 실제 채널 주소가 없으므로 링크를 걸지 않는다. */}
                    <p className="m-0 mt-2 text-[15px] font-semibold text-navy/80">
                      카카오톡 상담 채널 개설 예정
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 xl:col-span-7">
            <div className="rounded-[28px] bg-ivory p-6 shadow-[0_30px_60px_-30px_rgba(38,59,80,0.35)] sm:p-10">
              <p className="t-eyebrow m-0 text-sky-deep">Consultation Form</p>
              <p className="m-0 mb-7 mt-3 t-small text-ink-soft">
                남겨 주신 연락처로 상담 일정을 안내해 드립니다. 상담과 레벨 테스트는 무료입니다.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
