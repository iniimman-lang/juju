import { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa'
import './Courses.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const token = localStorage.getItem('adminToken')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon: 'FaBullhorn',
    level: 'Beginner',
    duration: '',
    students: '',
    rating: 5.0,
    price: '',
    shortDesc: '',
    description: '',
    whatYouLearn: [''],
    modules: [{ title: '', lessons: 0 }],
    outcomes: [''],
    image: '',
    popular: false
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses`)
      const data = await res.json()
      setCourses(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course) => {
    setFormData(course)
    setEditingId(course._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
      await fetch(`${API_URL}/api/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchCourses()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingId
        ? `${API_URL}/api/courses/${editingId}`
        : `${API_URL}/api/courses`

      const method = editingId ? 'PUT' : 'POST'

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      setShowForm(false)
      setEditingId(null)
      resetForm()
      fetchCourses()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      icon: 'FaBullhorn',
      level: 'Beginner',
      duration: '',
      students: '',
      rating: 5.0,
      price: '',
      shortDesc: '',
      description: '',
      whatYouLearn: [''],
      modules: [{ title: '', lessons: 0 }],
      outcomes: [''],
      image: '',
      popular: false
    })
  }

  const addArrayItem = (field) => {
    if (field === 'whatYouLearn') {
      setFormData({ ...formData, whatYouLearn: [...formData.whatYouLearn, ''] })
    } else if (field === 'outcomes') {
      setFormData({ ...formData, outcomes: [...formData.outcomes, ''] })
    } else if (field === 'modules') {
      setFormData({ ...formData, modules: [...formData.modules, { title: '', lessons: 0 }] })
    }
  }

  const updateArrayItem = (field, index, value) => {
    const newArray = [...formData[field]]
    if (field === 'modules') {
      newArray[index] = { ...newArray[index], ...value }
    } else {
      newArray[index] = value
    }
    setFormData({ ...formData, [field]: newArray })
  }

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: newArray })
  }

  const iconOptions = ['FaBullhorn', 'FaFacebook', 'FaTiktok', 'FaEnvelope', 'FaPenNib', 'FaWhatsapp', 'FaVideo']

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Manage Courses</h1>
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
          <FaPlus /> Add Course
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Course' : 'Add New Course'}</h2>
              <button onClick={() => setShowForm(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Slug</label>
                  <input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Icon</label>
                  <select value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })}>
                    {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Level</label>
                  <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>All Levels</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g., 10 weeks" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Students</label>
                  <input value={formData.students} onChange={(e) => setFormData({ ...formData, students: e.target.value })} placeholder="e.g., 220+" />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input type="number" step="0.1" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="e.g., $399" required />
                </div>
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <textarea value={formData.shortDesc} onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })} rows="2" required />
              </div>

              <div className="form-group">
                <label>Full Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="4" required />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
              </div>

              <div className="form-group">
                <label>What You'll Learn</label>
                {formData.whatYouLearn.map((item, i) => (
                  <div key={i} className="array-item">
                    <input value={item} onChange={(e) => updateArrayItem('whatYouLearn', i, e.target.value)} placeholder="Learning point" />
                    <button type="button" onClick={() => removeArrayItem('whatYouLearn', i)}>×</button>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addArrayItem('whatYouLearn')}>+ Add Point</button>
              </div>

              <div className="form-group">
                <label>Modules</label>
                {formData.modules.map((module, i) => (
                  <div key={i} className="array-item">
                    <input value={module.title} onChange={(e) => updateArrayItem('modules', i, { title: e.target.value })} placeholder="Module title" />
                    <input type="number" value={module.lessons} onChange={(e) => updateArrayItem('modules', i, { lessons: parseInt(e.target.value) || 0 })} placeholder="Lessons" style={{ width: '100px' }} />
                    <button type="button" onClick={() => removeArrayItem('modules', i)}>×</button>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addArrayItem('modules')}>+ Add Module</button>
              </div>

              <div className="form-group">
                <label>Outcomes</label>
                {formData.outcomes.map((item, i) => (
                  <div key={i} className="array-item">
                    <input value={item} onChange={(e) => updateArrayItem('outcomes', i, e.target.value)} placeholder="Outcome" />
                    <button type="button" onClick={() => removeArrayItem('outcomes', i)}>×</button>
                  </div>
                ))}
                <button type="button" className="btn-add" onClick={() => addArrayItem('outcomes')}>+ Add Outcome</button>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" checked={formData.popular} onChange={(e) => setFormData({ ...formData, popular: e.target.checked })} />
                  Mark as Popular
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Create'} Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="courses-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Level</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Popular</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td><span className="badge">{course.level}</span></td>
                <td>{course.duration}</td>
                <td>{course.price}</td>
                <td>{course.popular ? '✓' : '-'}</td>
                <td className="actions">
                  <button onClick={() => window.open(`/course/${course.slug}`, '_blank')} title="View"><FaEye /></button>
                  <button onClick={() => handleEdit(course)} title="Edit"><FaEdit /></button>
                  <button onClick={() => handleDelete(course._id)} title="Delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Courses
