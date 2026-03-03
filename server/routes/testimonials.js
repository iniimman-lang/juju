import express from 'express'
import Testimonial from '../models/Testimonial.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Create testimonial (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body)
    await testimonial.save()
    res.status(201).json(testimonial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update testimonial (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    res.json(testimonial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete testimonial (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    res.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
