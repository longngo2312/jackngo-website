import { useState, useCallback } from 'react'
import Scene3D from './components/Scene3D'
import BootSequence from './components/BootSequence'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import TechStackSection from './components/TechStackSection'
import ContactSection from './components/ContactSection'

function App() {
  const [booted, setBooted] = useState(false)

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <div className="scanline">
      {/* 3D Background */}
      <Scene3D />

      {/* Boot sequence overlay */}
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {/* Main content */}
      {booted && (
        <>
          <Navigation />
          <main className="flex flex-col items-center">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <TechStackSection />
            <ContactSection />
          </main>
        </>
      )}
    </div>
  )
}

export default App
