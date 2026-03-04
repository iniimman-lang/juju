import { useEffect, useState } from 'react'
import { FaCheck, FaTimes, FaEye, FaExclamationCircle } from 'react-icons/fa'
import './Enrollments.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Enrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchEnrollments()
  }, [])

  const fetchEnrollments = async () => {
    const res = await fetch(`${API_URL}/api/enrollments`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setEnrollments(data)
    setLoading(false)
  }

  const updateStatus = async (id, status, name) => {
    if (!confirm(`Are you sure you want to ${status === 'enrolled' ? 'approve' : 'reject'} this enrollment?`)) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/enrollments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        throw new Error('Failed to update enrollment')
      }

      const result = await response.json()
      console.log('Update result:', result)
      
      // Show success notification
      const action = status === 'enrolled' ? 'approved' : 'rejected'
      showNotification(`Enrollment ${action} for ${name}`, status === 'enrolled' ? 'success' : 'error')
      
      // Refresh the list
      await fetchEnrollments()
    } catch (error) {
      console.error('Error updating enrollment:', error)
      showNotification('Failed to update enrollment. Please try again.', 'error')
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const getStatusColor = (status) => {
    const colors = { pending: '#f6ad55', contacted: '#667eea', enrolled: '#00d9c0', rejected: '#fc8181' }
    return colors[status] || '#666'
  }

  const getStatusLabel = (status) => {
    const labels = { 
      pending: 'Pending Review', 
      contacted: 'Contacted', 
      enrolled: 'Enrolled', 
      rejected: 'Rejected' 
    }
    return labels[status] || status
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="enrollments-page">
      <div className="page-header">
        <h1>Enrollment Requests</h1>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? <FaCheck /> : <FaExclamationCircle />}
          {notification.message}
        </div>
      )}

      <div className="enrollments-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                  No enrollment requests yet
                </td>
              </tr>
            ) : (
              enrollments.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.course}</td>
                  <td><span className="badge" style={{ background: getStatusColor(e.status) }}>{getStatusLabel(e.status)}</span></td>
                  <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button 
                      onClick={() => updateStatus(e._id, 'enrolled', e.name)} 
                      title="Approve - Mark as enrolled"
                      disabled={e.status === 'enrolled' || e.status === 'rejected'}
                      style={{ opacity: (e.status === 'enrolled' || e.status === 'rejected') ? 0.3 : 1 }}
                    >
                      <FaCheck />
                    </button>
                    <button 
                      onClick={() => updateStatus(e._id, 'rejected', e.name)} 
                      title="Reject application"
                      disabled={e.status === 'enrolled' || e.status === 'rejected'}
                      style={{ opacity: (e.status === 'enrolled' || e.status === 'rejected') ? 0.3 : 1 }}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Enrollments
