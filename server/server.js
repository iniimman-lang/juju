import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Initialize SQLite database
const db = new Database(path.join(__dirname, 'database.sqlite'))

// Create tables
db.exec(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

db.exec(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT DEFAULT 'FaBullhorn',
    level TEXT DEFAULT 'Beginner',
    duration TEXT NOT NULL,
    students TEXT DEFAULT '0+',
    rating REAL DEFAULT 5.0,
    price TEXT NOT NULL,
    shortDesc TEXT NOT NULL,
    description TEXT NOT NULL,
    whatYouLearn TEXT DEFAULT '[]',
    modules TEXT DEFAULT '[]',
    outcomes TEXT DEFAULT '[]',
    image TEXT,
    popular INTEGER DEFAULT 0,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

db.exec(`CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image TEXT,
    rating INTEGER DEFAULT 5,
    text TEXT NOT NULL,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

db.exec(`CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    course TEXT NOT NULL,
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'pending',
    notes TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Access denied' })
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded
    next()
  } catch {
    res.status(403).json({ error: 'Invalid token' })
  }
}

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
  
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  
  const token = jwt.sign(
    { id: admin.id, username: admin.username, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
  
  res.json({
    token,
    admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role }
  })
})

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const admin = db.prepare('SELECT id, username, email, role FROM admins WHERE id = ?').get(req.admin.id)
  if (!admin) return res.status(404).json({ error: 'Admin not found' })
  res.json(admin)
})

// Course routes
app.get('/api/courses', (req, res) => {
  const courses = db.prepare('SELECT * FROM courses ORDER BY created_at DESC').all()
  res.json(courses.map(c => ({
    ...c,
    whatYouLearn: JSON.parse(c.whatYouLearn),
    modules: JSON.parse(c.modules),
    outcomes: JSON.parse(c.outcomes),
    popular: !!c.popular
  })))
})

app.get('/api/courses/:slug', (req, res) => {
  const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug)
  if (!course) return res.status(404).json({ error: 'Course not found' })
  res.json({
    ...course,
    whatYouLearn: JSON.parse(course.whatYouLearn),
    modules: JSON.parse(course.modules),
    outcomes: JSON.parse(course.outcomes),
    popular: !!course.popular
  })
})

app.post('/api/courses', authenticateToken, (req, res) => {
  const { whatYouLearn, modules, outcomes, popular, ...rest } = req.body
  const stmt = db.prepare(`
    INSERT INTO courses (title, slug, icon, level, duration, students, rating, price, shortDesc, description, whatYouLearn, modules, outcomes, image, popular)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    rest.title, rest.slug, rest.icon, rest.level, rest.duration, rest.students, rest.rating, rest.price, rest.shortDesc, rest.description,
    JSON.stringify(whatYouLearn), JSON.stringify(modules), JSON.stringify(outcomes), rest.image, popular ? 1 : 0
  )
  res.status(201).json({ id: result.lastInsertRowid, ...req.body })
})

app.put('/api/courses/:id', authenticateToken, (req, res) => {
  const { whatYouLearn, modules, outcomes, popular, ...rest } = req.body
  const stmt = db.prepare(`
    UPDATE courses SET title=?, slug=?, icon=?, level=?, duration=?, students=?, rating=?, price=?, shortDesc=?, description=?, whatYouLearn=?, modules=?, outcomes=?, image=?, popular=?
    WHERE id=?
  `)
  stmt.run(
    rest.title, rest.slug, rest.icon, rest.level, rest.duration, rest.students, rest.rating, rest.price, rest.shortDesc, rest.description,
    JSON.stringify(whatYouLearn), JSON.stringify(modules), JSON.stringify(outcomes), rest.image, popular ? 1 : 0,
    req.params.id
  )
  res.json({ id: req.params.id, ...req.body })
})

app.delete('/api/courses/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM courses WHERE id = ?').run(req.params.id)
  res.json({ message: 'Course deleted' })
})

// Testimonial routes
app.get('/api/testimonials', (req, res) => {
  res.json(db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all())
})

// Testimonial routes with file upload
app.post('/api/testimonials', authenticateToken, upload.single('image'), (req, res) => {
  const { featured, name, role, rating, text } = req.body
  const image = req.file ? `/uploads/${req.file.filename}` : ''
  const stmt = db.prepare('INSERT INTO testimonials (name, role, image, rating, text, featured) VALUES (?, ?, ?, ?, ?, ?)')
  const result = stmt.run(name, role, image, rating, text, featured ? 1 : 0)
  res.status(201).json({ id: result.lastInsertRowid, image })
})

app.put('/api/testimonials/:id', authenticateToken, upload.single('image'), (req, res) => {
  const { featured, name, role, rating, text } = req.body
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.existingImage
  db.prepare('UPDATE testimonials SET name=?, role=?, image=?, rating=?, text=?, featured=? WHERE id=?')
    .run(name, role, image, rating, text, featured ? 1 : 0, req.params.id)
  res.json({ id: req.params.id, image })
})

app.delete('/api/testimonials/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id)
  res.json({ message: 'Testimonial deleted' })
})

// Enrollment routes
app.get('/api/enrollments', authenticateToken, (req, res) => {
  res.json(db.prepare('SELECT * FROM enrollments ORDER BY created_at DESC').all())
})

app.post('/api/enrollments', (req, res) => {
  const { name, email, phone, course, message } = req.body
  const stmt = db.prepare('INSERT INTO enrollments (name, email, phone, course, message) VALUES (?, ?, ?, ?, ?)')
  stmt.run(name, email, phone, course, message || '')
  res.status(201).json({ message: 'Enrollment submitted!' })
})

app.put('/api/enrollments/:id', authenticateToken, (req, res) => {
  const { status, notes } = req.body
  console.log('Updating enrollment:', req.params.id, 'Status:', status)
  
  const stmt = db.prepare('UPDATE enrollments SET status=?, notes=? WHERE id=?')
  const result = stmt.run(status, notes || '', req.params.id)
  
  console.log('Update result:', result)
  
  // Fetch updated enrollment to return
  const updated = db.prepare('SELECT * FROM enrollments WHERE id = ?').get(req.params.id)
  res.json({ id: req.params.id, status, updated })
})

app.delete('/api/enrollments/:id', authenticateToken, (req, res) => {
  db.prepare('DELETE FROM enrollments WHERE id = ?').run(req.params.id)
  res.json({ message: 'Enrollment deleted' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Admin panel: http://localhost:5173/admin/login`)
  console.log(`📝 Default login: admin / admin123`)
})
