import { Link } from 'react-router-dom'
import { FaChalkboardTeacher, FaHandsHelping, FaAward, FaRocket } from 'react-icons/fa'
import { useEffect } from 'react'
import './HowItWorks.css'

function HowItWorks() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const steps = [
    {
      icon: FaChalkboardTeacher,
      title: '1. Choose Your Course',
      desc: 'Pick from 8 high-income digital skills. No prior experience needed - all courses start from basics.'
    },
    {
      icon: FaHandsHelping,
      title: '2. Learn with Hands-On Training',
      desc: 'Complete practical modules, work on real projects, and build your portfolio with guidance from experts.'
    },
    {
      icon: FaAward,
      title: '3. Complete Internship',
      desc: 'Get real work experience through our internship program. Apply your skills to actual client projects.'
    },
    {
      icon: FaRocket,
      title: '4. Get Placed',
      desc: 'We connect you with job opportunities and clients. Start earning from your new skill within 30 days.'
    }
  ]

  const features = [
    {
      title: 'Expert Instructors',
      desc: 'Learn from industry professionals with years of real-world experience.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop'
    },
    {
      title: 'Flexible Learning',
      desc: 'Study at your own pace. Access materials anytime, anywhere.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop'
    },
    {
      title: 'Community Support',
      desc: 'Join a supportive community of learners. Get help whenever you need it.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'
    }
  ]

  return (
    <main className="how-it-works-page">
      {/* Hero Section */}
      <section className="how-hero">
        <div className="container">
          <div className="how-hero-content">
            <h1>How It Works</h1>
            <p>Four simple steps to transform your career and start earning online</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="container">
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <div className="step-icon">
                  <step.icon />
                </div>
                <h2>{step.title}</h2>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Digital Course Arena?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <img src={feature.image} alt={feature.title} />
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="how-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join hundreds of students who have already transformed their careers.</p>
            <Link to="/enroll" className="btn primary btn-large">Enroll Now</Link>
            <Link to="/course" className="btn btn-large btn-outline">Browse Courses</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HowItWorks
