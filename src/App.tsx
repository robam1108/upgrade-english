import Header from './components/Header'
import HeroSection from './components/HeroSection'
import IntroductionSection from './components/IntroductionSection'
import CurriculumSection from './components/CurriculumSection'
import LearningSystemSection from './components/LearningSystemSection'
import TeacherSection from './components/TeacherSection'
import ClassroomSection from './components/ClassroomSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import FloatingContactButton from './components/FloatingContactButton'
import StructuredData from './components/StructuredData'

export default function App() {
  return (
    <div className="w-full bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[var(--radius-btn)] focus:bg-navy focus:px-5 focus:py-3 focus:text-base focus:font-bold focus:text-ivory"
      >
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <IntroductionSection />
        <CurriculumSection />
        <LearningSystemSection />
        <TeacherSection />
        <ClassroomSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContactButton />
      <StructuredData />
    </div>
  )
}
