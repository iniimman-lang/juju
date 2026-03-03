import express from 'express'
import Enrollment from '../models/Enrollment.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get all enrollments (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 })
    res.json(enrollments)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Create enrollment (public - for frontend form)
router.post('/', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body)
    await enrollment.save()
    res.status(201).json({ message: 'Enrollment submitted successfully!' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update enrollment status (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json(enrollment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete enrollment (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json({ message: 'Enrollment deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
