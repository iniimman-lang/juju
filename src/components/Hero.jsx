import { Link, useNavigate } from 'react-router-dom'
import { FaBullseye, FaBriefcase, FaCertificate, FaRocket, FaUsers } from 'react-icons/fa'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()

  const scrollToCourses = (e) => {
    e.preventDefault()
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Learn a High-Income Digital Skill and Get Your First Paying Client Within 30 Days</h1>
          <p className="sub">Stop depending on 9–5 jobs. Learn practical online skills and start working remotely from anywhere in the world.</p>

          <div className="hero-ctas">
            <Link className="btn primary" to="/enroll">Enroll Now &amp; Start Today</Link>
            <a className="btn" href="/#courses" onClick={scrollToCourses}>Pick Your Skill</a>
          </div>

          <ul className="features">
            <li className="feature-item">
              <span className="feature-icon"><FaBullseye /></span>
              <span className="feature-text">No Experience Needed</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon"><FaBriefcase /></span>
              <span className="feature-text">Internship Included</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon"><FaCertificate /></span>
              <span className="feature-text">Certification</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon"><FaRocket /></span>
              <span className="feature-text">Access to Paid Roles</span>
            </li>
            <li className="feature-item">
              <span className="feature-icon"><FaUsers /></span>
              <span className="feature-text">Supportive Community</span>
            </li>
          </ul>
        </div>

        <div className="hero-media">
          <div className="media-card">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Students learning together"
              className="media-image"
            />
          </div>
          <p className="media-heading">Digital Course Arena</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
