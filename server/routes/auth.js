import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get current admin
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' })
    }
    res.json(admin)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
