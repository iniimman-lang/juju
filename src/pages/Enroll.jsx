import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck, FaUser, FaEnvelope, FaPhone, FaGraduationCap } from 'react-icons/fa'
import './Enroll.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Enroll() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const courses = [
    'Social Media Management',
    'Facebook & Instagram Ads',
    'TikTok Ads',
    'Digital Marketing',
    'Virtual Assistant',
    'Graphic Design',
    'WhatsApp Marketing',
    'Video Editing'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await fetch(`${API_URL}/api/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const benefits = [
    'Hands-on training with real projects',
    'Internship program included',
    'Industry-recognized certification',
    'Job placement support',
    'Lifetime access to course materials',
    'Supportive community of learners',
    'Weekly live Q&A sessions',
    '30-day money-back guarantee'
  ]

  if (submitted) {
    return (
      <main className="enroll-page">
        <div className="enroll-success">
          <div className="success-icon">✓</div>
          <h1>Application Submitted!</h1>
          <p>Thank you for your interest. Our admissions team will contact you within 24 hours.</p>
          <Link to="/" className="btn primary">Back to Home</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="enroll-page">
      {/* Hero Section */}
      <section className="enroll-hero">
        <div className="container">
          <div className="enroll-hero-content">
            <h1>Enroll Now</h1>
            <p>Take the first step towards your new career. Fill out the form and we'll get you started.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="enroll-section">
        <div className="container">
          <div className="enroll-grid">
            <div className="enroll-form-container">
              <h2>Start Your Journey</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label><FaUser /> Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FaEnvelope /> Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FaPhone /> Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FaGraduationCap /> Select Course</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a course...</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals..."
                    rows="4"
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button 
                  type="submit" 
                  className="btn primary btn-large btn-full"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>

            <div className="enroll-benefits">
              <h2>What You Get</h2>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <FaCheck className="check-icon" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="enroll-cta-box">
                <h3>Need Help Choosing?</h3>
                <p>Not sure which course is right for you? Our career counselors are here to help.</p>
                <a href="mailto:info@digitalcoursearena.com" className="btn-outline">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Enroll
