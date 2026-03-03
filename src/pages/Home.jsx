import { useEffect } from 'react'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import IntroSection from '../components/IntroSection'
import CoursesSection from '../components/CoursesSection'
import TestimonialsSection from '../components/TestimonialsSection'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <Hero />
      <ProblemSection />
      <IntroSection />
      <CoursesSection />
      <TestimonialsSection />
    </main>
  )
}

export default Home
