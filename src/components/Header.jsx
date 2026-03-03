import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleNavClick = (sectionId) => {
    closeMenu()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePageNav = (path) => {
    closeMenu()
    window.scrollTo(0, 0)
    navigate(path)
  }

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="logo" onClick={() => { closeMenu(); window.scrollTo(0, 0) }}>
          Digital Course <span className="logo-accent">Arena</span>
        </Link>
        <nav className="nav">
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><button onClick={() => { handlePageNav('/'); window.scrollTo(0, 0) }}>Home</button></li>
            <li><button onClick={() => handleNavClick('courses')}>Courses</button></li>
            <li><button onClick={() => handlePageNav('/how-it-works')}>How it Works</button></li>
            <li><button onClick={() => handleNavClick('testimonials')}>Testimonials</button></li>
            <li><button onClick={() => handlePageNav('/faq')}>FAQ</button></li>
          </ul>
          <Link className="btn cta" to="/enroll" onClick={() => handlePageNav('/enroll')}>Enroll Now</Link>
          <button
            className={`nav-toggle ${menuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="hamburger"></span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
