import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok, FaBullhorn, FaEnvelope, FaPenNib, FaWhatsapp, FaVideo, FaCalendarAlt } from 'react-icons/fa'
import './CoursesSection.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

// Icon mapping
const iconMap = {
  FaBullhorn: FaBullhorn,
  FaFacebook: FaFacebook,
  FaTiktok: FaTiktok,
  FaEnvelope: FaEnvelope,
  FaPenNib: FaPenNib,
  FaWhatsapp: FaWhatsapp,
  FaVideo: FaVideo
}

function CoursesSection() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses`)
      const data = await res.json()
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="courses-section" id="courses">
        <div className="container">
          <div className="loading">Loading courses...</div>
        </div>
      </section>
    )
  }
  return (
    <section className="courses-section" id="courses">
      <div className="container">
        <div className="courses-head">
          <div className="section-badge">
            <span>Our Courses</span>
          </div>
          <h2>Choose Your Skill. Start Your Journey.</h2>
          <p className="muted">No prior knowledge required. Pick the path that fits your goals and start building your future today.</p>
          <Link className="btn primary" to="/enroll">Pick Your Skill &amp; Enroll</Link>
        </div>

        <div className="courses-grid">
          {courses.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No courses available yet.</p>
          ) : (
            courses.map((course, index) => {
              const IconComponent = iconMap[course.icon] || FaBullhorn
              return (
                <Link to={`/course/${course.slug}`} className="course-card-link" key={course.id || index}>
                  <article className={`course-card ${course.popular ? 'popular' : ''}`}>
                    {course.popular && <span className="popular-badge">Popular</span>}
                    <div className="course-icon">
                      <IconComponent />
                    </div>
                    <h3>{course.title}</h3>
                    <p className="course-desc">{course.shortDesc}</p>
                    <div className="course-meta">
                      <span className="course-duration"><FaCalendarAlt /> {course.duration}</span>
                    </div>
                    <span className="btn-outline">View Details</span>
                  </article>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
