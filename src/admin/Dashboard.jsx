import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBook, FaUsers, FaEnvelope, FaChartLine } from 'react-icons/fa'
import './Dashboard.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Dashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    testimonials: 0,
    enrollments: 0,
    pendingEnrollments: 0
  })
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [coursesRes, testimonialsRes, enrollmentsRes] = await Promise.all([
        fetch(`${API_URL}/api/courses`),
        fetch(`${API_URL}/api/testimonials`),
        fetch(`${API_URL}/api/enrollments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const courses = await coursesRes.json()
      const testimonials = await testimonialsRes.json()
      const enrollments = await enrollmentsRes.json()

      setStats({
        courses: courses.length,
        testimonials: testimonials.length,
        enrollments: enrollments.length || 0,
        pendingEnrollments: (enrollments || []).filter(e => e.status === 'pending').length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { title: 'Total Courses', value: stats.courses, icon: FaBook, color: '#667eea' },
    { title: 'Testimonials', value: stats.testimonials, icon: FaUsers, color: '#e94560' },
    { title: 'Total Enrollments', value: stats.enrollments, icon: FaEnvelope, color: '#00d9c0' },
    { title: 'Pending Review', value: stats.pendingEnrollments, icon: FaChartLine, color: '#f6ad55' }
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel. Manage your courses, testimonials, and enrollments.</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div className="stat-card" key={index} style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ background: stat.color }}>
              <stat.icon />
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? '...' : stat.value}</span>
              <span className="stat-label">{stat.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/courses" className="action-card">
            <FaBook />
            <span>Manage Courses</span>
          </Link>
          <Link to="/admin/testimonials" className="action-card">
            <FaUsers />
            <span>Manage Testimonials</span>
          </Link>
          <Link to="/admin/enrollments" className="action-card">
            <FaEnvelope />
            <span>View Enrollments</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
