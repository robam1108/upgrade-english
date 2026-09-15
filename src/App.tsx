import Header from './components/Header'
import Hero from './components/Hero'
import PainPoints from './components/PainPoints'
import Solution from './components/Solution'
import Curriculum from './components/Curriculum'
import Process from './components/Process'
import Teachers from './components/Teachers'
import Reviews from './components/Reviews'
import Spaces from './components/Spaces'
import FAQ from './components/FAQ'
import CtaBanner from './components/CtaBanner'
import ConsultForm from './components/ConsultForm'
import Footer from './components/Footer'
import MobileBar from './components/MobileBar'
import StructuredData from './components/StructuredData'

export default function App() {
  return (
    <div className="w-full bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-5 focus:py-3 focus:text-base focus:font-bold focus:text-orange focus:shadow-lg"
      >
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main">
        <Hero />
        <PainPoints />
        <Solution />
        <Curriculum />
        <Process />
        <Teachers />
        <Reviews />
        <Spaces />
        <FAQ />
        <CtaBanner />
        <ConsultForm />
      </main>
      <Footer />
      <MobileBar />
      <StructuredData />
    </div>
  )
}
