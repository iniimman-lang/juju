import { useEffect, useState } from 'react'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import './TestimonialsSection.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials`)
      const data = await res.json()
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="loading">Loading testimonials...</div>
        </div>
      </section>
    )
  }
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-head">
          <div className="section-badge">
            <span>Testimonials</span>
          </div>
          <h2>Success Stories From Our Students</h2>
          <p className="muted">Join hundreds of students who have transformed their lives with our programs.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No testimonials yet.</p>
          ) : (
            testimonials.map((t, index) => (
              <article className="testimonial-card" key={t.id || index}>
                <div className="testimonial-rating">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  {t.image && <img src={t.image.startsWith('/') ? `${API_URL}${t.image}` : t.image} alt={t.name} className="author-image" />}
                  <div className="author-info">
                    <strong className="author-name">{t.name}</strong>
                    <span className="author-role">{t.role}</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
