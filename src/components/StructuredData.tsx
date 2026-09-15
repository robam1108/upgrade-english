import { ACADEMY_NAME, ADDRESS, COORDS, FAQS, OPENING_HOURS, PHONE } from '../data/content'

/**
 * 검색 결과용 구조화 데이터.
 *
 * 카카오톡·네이버처럼 자바스크립트를 실행하지 않는 크롤러를 위한 공유 미리보기 태그는
 * index.html에 직접 넣어 두었다. JSON-LD는 자바스크립트를 실행하는 검색엔진만 읽으므로,
 * 카피가 바뀌어도 어긋나지 않도록 content.ts에서 그대로 만들어 낸다.
 */
export default function StructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: ACADEMY_NAME,
      description: '초등 4학년부터 중학 3학년까지 내신을 관리하는 영어학원입니다.',
      telephone: PHONE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS,
        addressLocality: '강남구',
        addressRegion: '서울특별시',
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COORDS.lat,
        longitude: COORDS.lng,
      },
      openingHours: OPENING_HOURS.filter((slot) => slot.hours !== '휴무').map(
        (slot) => `${slot.days} ${slot.hours.replace('–', '-')}`,
      ),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      // 데이터는 전부 이 저장소 안의 상수라 외부 입력이 섞일 여지가 없다.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
