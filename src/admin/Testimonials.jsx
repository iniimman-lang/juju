import { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaStar, FaUpload } from 'react-icons/fa'
import './Testimonials.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [preview, setPreview] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const token = localStorage.getItem('adminToken')

  // Helper to get the ID field (SQLite uses 'id', MongoDB uses '_id')
  const getId = (item) => item.id || item._id

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    text: '',
    featured: false
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    const res = await fetch(`${API_URL}/api/testimonials`)
    const data = await res.json()
    setTestimonials(data)
    setLoading(false)
  }

  const handleDelete = async (testimonial) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`${API_URL}/api/testimonials/${getId(testimonial)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    fetchTestimonials()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitData = new FormData()
    submitData.append('name', formData.name)
    submitData.append('role', formData.role)
    submitData.append('rating', formData.rating)
    submitData.append('text', formData.text)
    submitData.append('featured', formData.featured ? '1' : '0')
    if (selectedFile) {
      submitData.append('image', selectedFile)
    }
    // Pass existing image if no new file is uploaded
    if (editingId && !selectedFile && preview) {
      submitData.append('existingImage', preview)
    }

    const url = editingId
      ? `${API_URL}/api/testimonials/${editingId}`
      : `${API_URL}/api/testimonials`

    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Authorization': `Bearer ${token}` },
      body: submitData
    })

    if (res.ok) {
      setShowForm(false)
      setEditingId(null)
      setSelectedFile(null)
      setPreview('')
      setFormData({ name: '', role: '', rating: 5, text: '', featured: false })
      fetchTestimonials()
    }
  }

  const handleEdit = (t) => {
    setFormData({
      name: t.name,
      role: t.role,
      rating: t.rating,
      text: t.text,
      featured: t.featured
    })
    setEditingId(getId(t))
    setShowForm(true)
    if (t.image) {
      setPreview(t.image)
    } else {
      setPreview('')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', role: '', rating: 5, text: '', featured: false })
    setEditingId(null)
    setSelectedFile(null)
    setPreview('')
  }

  const toggleForm = () => {
    if (showForm) {
      resetForm()
    }
    setShowForm(!showForm)
  }

  if (loading) return <div className="loading">Loading testimonials...</div>

  return (
    <div className="testimonials-page">
      <div className="page-header">
        <h1>Testimonials</h1>
        <button onClick={toggleForm}>
          {showForm ? 'Cancel' : '+ Add Testimonial'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="testimonial-form">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Role (e.g., Student, Entrepreneur)"
            required
          />
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
            ))}
          </select>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            placeholder="Testimonial text"
            rows="4"
            required
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            Featured
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" className="preview" />}
          <button type="submit">{editingId ? 'Update' : 'Add'} Testimonial</button>
        </form>
      )}

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={getId(t)} className={`testimonial-card ${t.featured ? 'featured' : ''}`}>
            {t.image && <img src={t.image} alt={t.name} />}
            <div className="stars">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text">"{t.text}"</p>
            <p className="author">
              — {t.name}, {t.role}
            </p>
            <div className="actions">
              <button onClick={() => handleEdit(t)}><FaEdit /> Edit</button>
              <button onClick={() => handleDelete(t)}><FaTrash /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
