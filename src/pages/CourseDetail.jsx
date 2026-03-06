import { useParams, Link } from 'react-router-dom'
import { FaCheck, FaClock, FaCertificate, FaUsers, FaLaptop, FaStar, FaArrowLeft, FaPlay, FaBook, FaTasks, FaBriefcase } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import './CourseDetail.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function CourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCourse()
  }, [courseId])

  const fetchCourse = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses/${courseId}`)
      const data = await res.json()
      setCourse(data)
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="course-not-found">
        <h2>Loading course details...</h2>
        <Link to="/" className="btn primary">Back to Home</Link>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <Link to="/" className="btn primary">Back to Home</Link>
      </div>
    )
  }

  return (
    <main className="course-detail-page">
      {/* Hero Section */}
      <section className="course-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Home
          </Link>
          <div className="course-hero-content">
            <div className="course-hero-text">
              <span className="course-badge">{course.level} Level</span>
              <h1>{course.title}</h1>
              <p className="course-hero-desc">{course.description}</p>
              <div className="course-stats">
                <div className="stat">
                  <FaClock />
                  <span>{course.duration}</span>
                </div>
                <div className="stat">
                  <FaUsers />
                  <span>{course.students} Students</span>
                </div>
                <div className="stat">
                  <FaStar />
                  <span>{course.rating} Rating</span>
                </div>
              </div>
              <div className="course-hero-ctas">
                <a href="#enroll" className="btn primary btn-large">Enroll Now - {course.price}</a>
                <a href="#curriculum" className="btn btn-large btn-outline">View Curriculum</a>
              </div>
            </div>
            <div className="course-hero-image">
              <img src={course.image} alt={course.title} />
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="course-section">
        <div className="container">
          <h2>What You'll Learn</h2>
          <div className="learn-grid">
            {course.whatYouLearn.map((item, index) => (
              <div className="learn-item" key={index}>
                <FaCheck className="check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="course-section modules-section" id="curriculum">
        <div className="container">
          <h2>Course Curriculum</h2>
          <div className="modules-grid">
            {course.modules.map((module, index) => (
              <div className="module-card" key={index}>
                <div className="module-header">
                  <span className="module-number">Module {index + 1}</span>
                  <FaBook />
                </div>
                <h3>{module.title}</h3>
                <p>{module.lessons} lessons</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="course-section outcomes-section">
        <div className="container">
          <h2>After This Course</h2>
          <div className="outcomes-grid">
            {course.outcomes.map((outcome, index) => (
              <div className="outcome-card" key={index}>
                <div className="outcome-icon"><FaBriefcase /></div>
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="course-cta" id="enroll">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join hundreds of successful students and transform your career today.</p>
            <div className="cta-price">
              <span className="price">{course.price}</span>
              <span className="price-desc">One-time payment, lifetime access</span>
            </div>
            <button className="btn primary btn-large">Enroll Now</button>
            <div className="guarantee">
              <FaCertificate />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CourseDetail
