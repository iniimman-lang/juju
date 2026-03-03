import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  const handlePageNav = (path) => {
    window.scrollTo(0, 0)
    navigate(path)
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" onClick={() => window.scrollTo(0, 0)}>
              Digital Course <span className="logo-accent">Arena</span>
            </Link>
            <p className="footer-desc">
              Your one-stop online skill learning academy. We bridge the gap between learning and earning with hands-on training and job placement support.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => handlePageNav('/')}>Home</button></li>
              <li><button onClick={() => handlePageNav('/#courses')}>Courses</button></li>
              <li><button onClick={() => handlePageNav('/how-it-works')}>How It Works</button></li>
              <li><button onClick={() => handlePageNav('/#testimonials')}>Testimonials</button></li>
              <li><button onClick={() => handlePageNav('/faq')}>FAQ</button></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Courses</h4>
            <ul>
              <li><button onClick={() => handlePageNav('/course/social-media')}>Social Media Management</button></li>
              <li><button onClick={() => handlePageNav('/course/facebook-ads')}>Facebook & Instagram Ads</button></li>
              <li><button onClick={() => handlePageNav('/course/tiktok-ads')}>TikTok Ads</button></li>
              <li><button onClick={() => handlePageNav('/course/digital-marketing')}>Digital Marketing</button></li>
              <li><button onClick={() => handlePageNav('/course/virtual-assistant')}>Virtual Assistant</button></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <FaEnvelope />
                <span>info@digitalcoursearena.com</span>
              </li>
              <li>
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>123 Learning Street, Education City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Digital Course Arena. Made with <FaHeart /> for learners worldwide.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
