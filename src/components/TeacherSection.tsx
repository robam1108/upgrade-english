import Reveal from './Reveal'
import SectionMark from './ui/SectionMark'
import { LEAD_TEACHER, OTHER_TEACHERS } from '../data/content'

export default function TeacherSection() {
  return (
    <section id="teacher" aria-labelledby="teacher-heading" className="section-y overflow-hidden bg-sky-soft">
      <div className="container-x">
        <SectionMark index="04" label="Teacher" />

        {/* 모바일은 제목 → 사진 → 소개 순서, 데스크톱은 사진이 왼쪽 두 줄을 차지한다. */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
          <Reveal className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:pt-4">
            <h2 id="teacher-heading" className="t-h2 text-navy">
              좋은 가르침은
              <br />
              학생을 이해하는 것에서 시작됩니다.
            </h2>
          </Reveal>

          <Reveal className="relative mx-auto w-full max-w-[460px] self-start lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none">
            <div
              aria-hidden
              className="absolute -left-10 -top-10 size-[220px] rounded-full bg-butter sm:size-[280px] lg:-left-16 lg:-top-12 lg:size-[340px]"
            />
            <figure className="relative m-0">
              <img
                src={LEAD_TEACHER.photo}
                srcSet={`${LEAD_TEACHER.photo} 520w, ${LEAD_TEACHER.photo2x} 860w`}
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 460px, 100vw"
                alt={`${LEAD_TEACHER.name} 프로필 사진`}
                width={520}
                height={650}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[28px] object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[18px] bg-ivory/95 px-5 py-4 backdrop-blur">
                <span>
                  <span className="t-eyebrow block text-sky-deep">{LEAD_TEACHER.role}</span>
                  <span className="mt-2 block font-display text-[22px] font-bold leading-[1.3] text-navy">{LEAD_TEACHER.name}</span>
                </span>
                <span className="font-en text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-mute">Lead</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-2">
            <Reveal delay={0.08}>
              <blockquote className="relative m-0 border-l-4 border-sky pl-6">
                <span
                  aria-hidden
                  className="absolute -top-6 left-5 font-en text-[64px] font-bold leading-none text-sky"
                >
                  “
                </span>
                <p className="t-lead m-0 pt-5 text-navy">{LEAD_TEACHER.philosophy}</p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="t-eyebrow m-0 text-sky-deep">Specialty</h3>
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                  {LEAD_TEACHER.fields.map((field) => (
                    <li key={field} className="rounded-full bg-ivory px-3.5 py-2 text-[14px] font-semibold text-navy">
                      {field}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-[18px] border-2 border-dashed border-navy/20 p-5">
                  <p className="t-eyebrow m-0 text-ink-mute">Education &amp; Career</p>
                  <p className="m-0 mt-2.5 t-small text-ink-soft">
                    학력·경력 정보 입력 예정
                    <span className="block text-[13px] text-ink-mute">포트폴리오 데모라 실제 이력을 넣지 않았습니다.</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="t-eyebrow m-0 text-sky-deep">How I Teach</h3>
                <ol className="m-0 mt-4 list-none space-y-4 p-0">
                  {LEAD_TEACHER.methods.map((method, i) => (
                    <li key={method} className="grid grid-cols-[28px_1fr] gap-2 t-small text-navy">
                      <span className="font-en text-[14px] font-bold text-sky-deep tnum">0{i + 1}</span>
                      {method}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <p className="t-eyebrow m-0 text-ink-mute">With our teachers</p>
          <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {OTHER_TEACHERS.map((t) => (
              <li key={t.name} className="flex items-center gap-4 rounded-[20px] bg-ivory p-4 pr-6">
                <img
                  src={t.photo}
                  srcSet={`${t.photo} 160w, ${t.photo2x} 320w`}
                  sizes="72px"
                  alt={`${t.name} 프로필 사진`}
                  width={160}
                  height={160}
                  loading="lazy"
                  className="size-[72px] shrink-0 rounded-full object-cover"
                />
                <span>
                  <span className="block text-[13px] font-semibold text-sky-deep">{t.role}</span>
                  <span className="mt-0.5 block text-[17px] font-bold text-navy">{t.name}</span>
                  <span className="block text-[14px] text-ink-soft">{t.field}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
