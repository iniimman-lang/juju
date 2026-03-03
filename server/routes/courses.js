import express from 'express'
import Course from '../models/Course.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })
    res.json(courses)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get single course by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Create course (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.status(201).json(course)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update course (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json(course)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete course (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }
    res.json({ message: 'Course deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
