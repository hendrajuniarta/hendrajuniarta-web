import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { HeroSequence } from './components/sections/HeroSequence'
import { SelectedWork } from './components/sections/SelectedWork'
import { SmoothScroll } from './components/ui/SmoothScroll'
import { LanguageProvider } from './context/LanguageContext'

export function App() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Navbar />
        <main>
          <HeroSequence />
          <ExperienceSection />
          <SelectedWork />
        </main>
        <Footer />
      </SmoothScroll>
    </LanguageProvider>
  )
}

export default App
