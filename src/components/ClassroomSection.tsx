import Reveal from './Reveal'
import SectionMark from './ui/SectionMark'
import { CLASSROOM } from '../data/content'

type Space = (typeof CLASSROOM)[keyof typeof CLASSROOM]

type TileProps = {
  space: Space
  /** 이미지 칸의 크기·비율. 모바일은 비율로, 데스크톱은 그리드 행 높이로 정한다. */
  frame: string
  sizes: string
  widths: [number, number]
  className?: string
  delay?: number
}

/**
 * 사진 한 칸. 모바일에서는 설명이 사진 아래에 붙고,
 * 데스크톱에서는 사진 왼쪽 아래에 아이보리 카드로 겹쳐 잡지 화보처럼 보인다.
 */
function Tile({ space, frame, sizes, widths, className = '', delay = 0 }: TileProps) {
  return (
    <Reveal as="figure" delay={delay} className={`group relative m-0 flex flex-col ${className}`}>
      <div className={`relative overflow-hidden rounded-[var(--radius-card)] ${frame}`}>
        <img
          src={space.photo}
          srcSet={`${space.photo} ${widths[0]}w, ${space.photo2x} ${widths[1]}w`}
          sizes={sizes}
          alt={space.alt}
          width={widths[0]}
          height={widths[0]}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <span className="t-eyebrow absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-2 text-[10.5px] text-ivory backdrop-blur sm:text-[11px]">
          {space.en}
        </span>
      </div>
      <figcaption className="mt-3 lg:absolute lg:bottom-4 lg:left-4 lg:mt-0 lg:max-w-[min(300px,calc(100%-2rem))] lg:rounded-[16px] lg:bg-ivory/95 lg:px-4 lg:py-3 lg:backdrop-blur">
        <span className="block text-[16px] font-bold text-navy lg:text-[17px]">{space.title}</span>
        <span className="mt-1 block t-small text-ink-soft">{space.desc}</span>
      </figcaption>
    </Reveal>
  )
}

export default function ClassroomSection() {
  return (
    <section id="classroom" aria-labelledby="classroom-heading" className="section-y bg-ivory">
      <div className="container-x">
        <SectionMark index="05" label="Our Classroom" />

        {/* 다른 섹션과 달리 머리말을 오른쪽에 붙여, 갤러리로 넘어가는 시선의 흐름을 바꾼다. */}
        <div className="mt-10 flex flex-col gap-5 lg:mt-14 lg:items-end lg:text-right">
          <Reveal>
            <h2 id="classroom-heading" className="t-h2 text-navy">
              아이가 머무는 공간도
              <br />
              배움의 일부입니다.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="t-body m-0 max-w-[30em] text-ink-soft">
              수업, 자습, 상담이 한 공간 안에서 이어지도록 동선을 나눴습니다. 상담 방문 시 직접 둘러보실 수 있습니다.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 lg:mt-16 lg:grid-cols-12 lg:grid-rows-[300px_300px_380px] lg:gap-5">
          <Tile
            space={CLASSROOM.classroom}
            frame="aspect-[4/3] lg:aspect-auto lg:h-full"
            sizes="(min-width: 1024px) 690px, 100vw"
            widths={[640, 1024]}
            className="col-span-2 lg:col-span-7 lg:row-span-2"
          />
          <Tile
            space={CLASSROOM.study}
            frame="aspect-square lg:aspect-auto lg:h-full"
            sizes="(min-width: 1024px) 490px, 50vw"
            widths={[520, 1040]}
            className="lg:col-span-5"
            delay={0.08}
          />
          <Tile
            space={CLASSROOM.consult}
            frame="aspect-square lg:aspect-auto lg:h-full"
            sizes="(min-width: 1024px) 490px, 50vw"
            widths={[520, 1040]}
            className="lg:col-span-5"
            delay={0.14}
          />
          <Tile
            space={CLASSROOM.materials}
            frame="aspect-[16/9] sm:aspect-[21/8] lg:aspect-auto lg:h-full"
            sizes="(min-width: 1240px) 1180px, 100vw"
            widths={[800, 1536]}
            className="col-span-2 lg:col-span-12"
          />
        </div>
      </div>
    </section>
  )
}
