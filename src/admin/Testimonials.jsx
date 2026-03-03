import { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaStar, FaUpload } from 'react-icons/fa'
import './Testimonials.css'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [preview, setPreview] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const token = localStorage.getItem('adminToken')

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
    const res = await fetch('http://localhost:5001/api/testimonials')
    const data = await res.json()
    setTestimonials(data)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`http://localhost:5001/api/testimonials/${id}`, {
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
    if (editingId && !selectedFile) {
      submitData.append('existingImage', formData.existingImage || '')
    }

    const url = editingId
      ? `http://localhost:5001/api/testimonials/${editingId}`
      : 'http://localhost:5001/api/testimonials'
    const method = editingId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Authorization': `Bearer ${token}` },
      body: submitData
    })

    setShowForm(false)
    setEditingId(null)
    setSelectedFile(null)
    setPreview('')
    fetchTestimonials()
  }

  const handleEdit = (t) => {
    setFormData({
      name: t.name,
      role: t.role,
      rating: t.rating,
      text: t.text,
      featured: t.featured,
      existingImage: t.image
    })
    setPreview(t.image ? `http://localhost:5001${t.image}` : '')
    setEditingId(t._id || t.id)
    setShowForm(true)
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="testimonials-page">
      <div className="page-header">
        <h1>Manage Testimonials</h1>
        <button className="btn-primary" onClick={() => {
          setFormData({ name: '', role: '', rating: 5, text: '', featured: false })
          setPreview('')
          setSelectedFile(null)
          setEditingId(null)
          setShowForm(true)
        }}>Add Testimonial</button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit' : 'Add'} Testimonial</h2>
              <button onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="testimonial-form">
              <div className="form-group">
                <label>Name</label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required />
              </div>
              
              <div className="form-group">
                <label>Photo</label>
                <div className="file-upload">
                  {preview && <img src={preview} alt="Preview" className="preview" />}
                  <label className="upload-btn">
                    <FaUpload /> Choose Image
                    <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                  </label>
                  {selectedFile && <span className="file-name">{selectedFile.name}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <select value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Text</label>
                <textarea value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} rows="4" required />
              </div>
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} />
                  Mark as Featured
                </label>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t._id || t.id} className="testimonial-card">
            <div className="testimonial-header">
              <img src={t.image ? `http://localhost:5001${t.image}` : 'https://via.placeholder.com/50'} alt={t.name} />
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
            <div className="rating">
              {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p>{t.text}</p>
            <div className="actions">
              <button onClick={() => handleEdit(t)}><FaEdit /></button>
              <button onClick={() => handleDelete(t._id || t.id)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
