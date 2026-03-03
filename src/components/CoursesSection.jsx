import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok, FaBullhorn, FaEnvelope, FaPenNib, FaWhatsapp, FaVideo, FaCalendarAlt } from 'react-icons/fa'
import './CoursesSection.css'

const courses = [
  { 
    id: 'social-media',
    title: 'Social Media Management', 
    desc: 'Help brands grow their online presence across all platforms.', 
    icon: FaBullhorn,
    duration: '8 weeks',
    popular: true
  },
  { 
    id: 'facebook-ads',
    title: 'Facebook & Instagram Ads', 
    desc: 'Master Meta ads to drive sales and conversions for businesses.', 
    icon: FaFacebook,
    duration: '6 weeks',
    popular: false
  },
  { 
    id: 'tiktok-ads',
    title: 'TikTok Ads', 
    desc: 'Tap into the fastest-growing platform for viral marketing.', 
    icon: FaTiktok,
    duration: '4 weeks',
    popular: true
  },
  { 
    id: 'digital-marketing',
    title: 'Digital Marketing', 
    desc: 'Learn complete online sales funnels and marketing strategies.', 
    icon: FaBullhorn,
    duration: '10 weeks',
    popular: false
  },
  { 
    id: 'virtual-assistant',
    title: 'Virtual Assistant', 
    desc: 'Provide remote administrative and creative support to executives.', 
    icon: FaEnvelope,
    duration: '8 weeks',
    popular: false
  },
  { 
    id: 'graphic-design',
    title: 'Graphic Design', 
    desc: 'Create stunning visuals for ads, brands, and marketing materials.', 
    icon: FaPenNib,
    duration: '10 weeks',
    popular: true
  },
  { 
    id: 'whatsapp-marketing',
    title: 'WhatsApp Marketing', 
    desc: 'Help businesses sell directly through WhatsApp conversations.', 
    icon: FaWhatsapp,
    duration: '4 weeks',
    popular: false
  },
  { 
    id: 'video-editing',
    title: 'Video Editing', 
    desc: 'Edit engaging content for creators, brands, and social media.', 
    icon: FaVideo,
    duration: '8 weeks',
    popular: true
  },
]

function CoursesSection() {
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
          {courses.map((course, index) => (
            <Link to={`/course/${course.id}`} className="course-card-link" key={index}>
              <article className={`course-card ${course.popular ? 'popular' : ''}`}>
                {course.popular && <span className="popular-badge">Popular</span>}
                <div className="course-icon">
                  <course.icon />
                </div>
                <h3>{course.title}</h3>
                <p className="course-desc">{course.desc}</p>
                <div className="course-meta">
                  <span className="course-duration"><FaCalendarAlt /> {course.duration}</span>
                </div>
                <span className="btn-outline">View Details</span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
