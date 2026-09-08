import Backdrop from './components/Backdrop'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import ProjectsSection from './components/ProjectsSection'
import StackSection from './components/StackSection'
import ContactSection from './components/ContactSection'
import ScrollTop from './components/ScrollTop'

export default function App() {
  return (
    <>
      <Backdrop />
      <Navigation />
      <main className="md:pb-28">
        <HeroSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </main>
      <ScrollTop />
    </>
  )
}
