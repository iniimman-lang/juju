import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import './TestimonialsSection.css'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Social Media Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'I went from zero knowledge to landing my first client in just 6 weeks. The internship program gave me real experience that I could showcase to potential clients.'
  },
  {
    name: 'Michael Chen',
    role: 'Facebook Ads Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'The hands-on approach is what sets this apart. I was running actual ad campaigns during the course, and by graduation I already had 3 paying clients.'
  },
  {
    name: 'Amara Okafor',
    role: 'Virtual Assistant',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    text: 'As a stay-at-home mum, I needed flexibility. This program delivered. I now work 20 hours a week from home and earn more than my previous 9-5 job.'
  },
  {
    name: 'David Martinez',
    role: 'Video Editor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    text: 'The job placement support is real. They connected me with a YouTube creator who now pays me $2000/month for editing 8 videos. Life-changing!'
  },
  {
    name: 'Priya Sharma',
    role: 'Graphic Designer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    rating: 5,
    text: 'I was skeptical about online courses, but the mentorship and community support here is incredible. I built a portfolio that got me hired by a top agency.'
  },
  {
    name: 'James Wilson',
    role: 'Digital Marketing Specialist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Best investment I ever made. The curriculum is up-to-date, the instructors are industry professionals, and the results speak for themselves.'
  }
]

function TestimonialsSection() {
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
          {testimonials.map((testimonial, index) => (
            <article className="testimonial-card" key={index}>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                <div className="author-info">
                  <strong className="author-name">{testimonial.name}</strong>
                  <span className="author-role">{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
