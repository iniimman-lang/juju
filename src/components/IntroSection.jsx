import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaLaptop, FaUsers, FaAward } from 'react-icons/fa'
import './IntroSection.css'

function IntroSection() {
  const navigate = useNavigate()

  const handlePageNav = (path) => {
    window.scrollTo(0, 0)
    navigate(path)
  }

  return (
    <section className="intro-section" id="intro">
      <div className="container">
        <div className="intro-inner">
          <div className="section-badge">
            <span>Welcome to</span>
          </div>
          <h2>Digital Course Arena</h2>
          <p className="muted">Your One-Stop Online Skill Learning Academy</p>

          <p className="intro-copy">
            Most platforms just give you videos and leave you alone. We created{' '}
            <strong>Digital Course Arena</strong> to bridge the gap between learning a skill and
            actually getting paid for it. You get hands-on training, practical tasks, portfolio
            building, and an internship to practice before you go solo.
          </p>

          <div className="intro-features">
            <div className="intro-feature">
              <div className="intro-feature-icon"><FaLaptop /></div>
              <div className="intro-feature-content">
                <strong>Hands-On Training</strong>
                <p>Learn by doing real projects, not just watching videos.</p>
              </div>
            </div>
            <div className="intro-feature">
              <div className="intro-feature-icon"><FaUsers /></div>
              <div className="intro-feature-content">
                <strong>Internship Program</strong>
                <p>Gain practical experience before you start freelancing.</p>
              </div>
            </div>
            <div className="intro-feature">
              <div className="intro-feature-icon"><FaAward /></div>
              <div className="intro-feature-content">
                <strong>Certification</strong>
                <p>Earn a recognized certificate to boost your credibility.</p>
              </div>
            </div>
            <div className="intro-feature">
              <div className="intro-feature-icon"><FaCheckCircle /></div>
              <div className="intro-feature-content">
                <strong>Job Placement</strong>
                <p>We connect you with paying clients and job opportunities.</p>
              </div>
            </div>
          </div>

          <div className="intro-ctas">
            <Link className="btn cta" to="/enroll" onClick={() => { window.scrollTo(0, 0) }}>Join the Next Batch</Link>
            <button className="btn" onClick={() => handlePageNav('/how-it-works')}>How It Works</button>
          </div>

          <div className="social-proof">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Students Trained</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">6</span>
              <span className="stat-label">Months Program</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">85%</span>
              <span className="stat-label">Job Placement Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
