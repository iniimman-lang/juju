import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new Database(path.join(__dirname, 'database.sqlite'))

// Create tables first
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

// Clear existing data
db.exec('DELETE FROM courses; DELETE FROM testimonials; DELETE FROM enrollments;')

const courses = [
  {
    title: 'Social Media Management',
    slug: 'social-media',
    icon: 'FaBullhorn',
    level: 'Beginner',
    duration: '8 weeks',
    students: '250+',
    rating: 4.9,
    price: '$299',
    shortDesc: 'Help brands grow their online presence across all platforms.',
    description: 'Master the art of managing social media accounts for businesses.',
    whatYouLearn: ['Create engaging content calendars', 'Grow organic following strategically', 'Use analytics to optimize performance', 'Manage multiple client accounts', 'Create viral-worthy content', 'Build brand voice and identity'],
    modules: [{ title: 'Foundation of Social Media', lessons: 5 }, { title: 'Content Creation & Strategy', lessons: 8 }, { title: 'Community Management', lessons: 4 }, { title: 'Analytics & Reporting', lessons: 6 }, { title: 'Client Management', lessons: 4 }, { title: 'Building Your Portfolio', lessons: 3 }],
    outcomes: ['Manage 3-5 client accounts', 'Earn $1,500-$3,000 per client monthly', 'Build a professional portfolio', 'Get certified and job-ready'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
    popular: true
  },
  {
    title: 'Facebook & Instagram Ads',
    slug: 'facebook-ads',
    icon: 'FaFacebook',
    level: 'Beginner',
    duration: '6 weeks',
    students: '180+',
    rating: 4.8,
    price: '$349',
    shortDesc: 'Master Meta ads to drive sales and conversions for businesses.',
    description: 'Become a certified Meta ads specialist.',
    whatYouLearn: ['Set up Meta Business Manager', 'Create high-converting ad creatives', 'Target the perfect audience', 'Optimize ad spend for maximum ROI', 'A/B test ads effectively', 'Track and report campaign performance'],
    modules: [{ title: 'Meta Ads Foundation', lessons: 4 }, { title: 'Audience Targeting Mastery', lessons: 6 }, { title: 'Ad Creative & Copywriting', lessons: 5 }, { title: 'Campaign Optimization', lessons: 6 }, { title: 'Retargeting Strategies', lessons: 4 }, { title: 'Scaling & Reporting', lessons: 3 }],
    outcomes: ['Run profitable ad campaigns', 'Charge $500-$2,000 per setup', 'Manage monthly ad budgets', 'Get Meta certified'],
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=500&fit=crop',
    popular: false
  },
  {
    title: 'TikTok Ads',
    slug: 'tiktok-ads',
    icon: 'FaTiktok',
    level: 'Beginner',
    duration: '4 weeks',
    students: '120+',
    rating: 4.7,
    price: '$249',
    shortDesc: 'Tap into the fastest-growing platform for viral marketing.',
    description: 'Learn to create and manage TikTok ad campaigns that go viral.',
    whatYouLearn: ['Understand TikTok algorithm', 'Create viral ad content', 'Use TikTok Ads Manager', 'Leverage trending sounds and effects', 'Target Gen Z and Millennial audiences', 'Measure campaign success'],
    modules: [{ title: 'TikTok Platform Basics', lessons: 3 }, { title: 'Viral Content Creation', lessons: 6 }, { title: 'TikTok Ads Manager', lessons: 5 }, { title: 'Trend Marketing', lessons: 4 }],
    outcomes: ['Create viral TikTok ads', 'Earn $1,000-$2,500 per campaign', 'Work with e-commerce brands', 'Build a TikTok portfolio'],
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=500&fit=crop',
    popular: true
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'FaBullhorn',
    level: 'All Levels',
    duration: '10 weeks',
    students: '300+',
    rating: 4.9,
    price: '$499',
    shortDesc: 'Learn complete online sales funnels and marketing strategies.',
    description: 'Become a full-stack digital marketer.',
    whatYouLearn: ['SEO and content marketing', 'Email marketing automation', 'Sales funnel creation', 'Multi-channel marketing', 'Google Analytics mastery', 'Marketing strategy development'],
    modules: [{ title: 'Digital Marketing Fundamentals', lessons: 6 }, { title: 'SEO Mastery', lessons: 8 }, { title: 'Email Marketing', lessons: 5 }, { title: 'Paid Advertising', lessons: 7 }, { title: 'Analytics & Data', lessons: 6 }, { title: 'Strategy & Planning', lessons: 4 }],
    outcomes: ['Work as marketing manager', 'Earn $3,000-$6,000 monthly', 'Handle complete marketing', 'Start your own agency'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    popular: false
  },
  {
    title: 'Virtual Assistant',
    slug: 'virtual-assistant',
    icon: 'FaEnvelope',
    level: 'Beginner',
    duration: '8 weeks',
    students: '200+',
    rating: 4.8,
    price: '$279',
    shortDesc: 'Provide remote administrative and creative support to executives.',
    description: 'Launch your career as a professional virtual assistant.',
    whatYouLearn: ['Essential VA tools and software', 'Email and calendar management', 'Client communication skills', 'Time management & productivity', 'Travel planning & booking', 'Basic bookkeeping'],
    modules: [{ title: 'VA Fundamentals', lessons: 5 }, { title: 'Tools & Software', lessons: 6 }, { title: 'Communication Mastery', lessons: 4 }, { title: 'Task Management', lessons: 5 }, { title: 'Client Relations', lessons: 4 }, { title: 'Finding Clients', lessons: 3 }],
    outcomes: ['Work with international clients', 'Earn $15-$40 per hour', 'Flexible remote work', 'Build long-term contracts'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
    popular: false
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    icon: 'FaPenNib',
    level: 'Beginner',
    duration: '10 weeks',
    students: '220+',
    rating: 4.9,
    price: '$399',
    shortDesc: 'Master graphic design from scratch. Learn Adobe Photoshop, Illustrator, and Canva.',
    description: 'Create logos, social media graphics, marketing materials, and brand identities that stand out.',
    whatYouLearn: ['Design principles & typography', 'Adobe Photoshop mastery', 'Adobe Illustrator essentials', 'Brand identity design', 'Social media graphics', 'Client presentation skills'],
    modules: [{ title: 'Design Fundamentals', lessons: 6 }, { title: 'Photoshop Mastery', lessons: 8 }, { title: 'Illustrator Essentials', lessons: 7 }, { title: 'Brand Identity', lessons: 5 }, { title: 'Marketing Materials', lessons: 4 }, { title: 'Building Portfolio', lessons: 4 }],
    outcomes: ['Create professional designs', 'Charge $50-$500 per project', 'Build design portfolio', 'Work with global clients'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&h=500&fit=crop',
    popular: true
  },
  {
    title: 'WhatsApp Marketing',
    slug: 'whatsapp-marketing',
    icon: 'FaWhatsapp',
    level: 'Beginner',
    duration: '4 weeks',
    students: '150+',
    rating: 4.6,
    price: '$199',
    shortDesc: 'Help businesses sell directly through WhatsApp conversations.',
    description: 'Learn the power of conversational marketing.',
    whatYouLearn: ['WhatsApp Business setup', 'Broadcast list strategies', 'Automated message sequences', 'Customer relationship management', 'Sales conversation techniques', 'Compliance and best practices'],
    modules: [{ title: 'WhatsApp Business Basics', lessons: 3 }, { title: 'Building Contact Lists', lessons: 4 }, { title: 'Message Automation', lessons: 5 }, { title: 'Sales Through WhatsApp', lessons: 4 }],
    outcomes: ['Help businesses sell via WhatsApp', 'Earn $500-$1,500 per client', 'Set up WhatsApp systems', 'Work with local businesses'],
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=500&fit=crop',
    popular: false
  },
  {
    title: 'Video Editing',
    slug: 'video-editing',
    icon: 'FaVideo',
    level: 'Beginner',
    duration: '8 weeks',
    students: '190+',
    rating: 4.8,
    price: '$379',
    shortDesc: 'Edit engaging content for creators, brands, and social media.',
    description: 'Become a professional video editor.',
    whatYouLearn: ['Video editing fundamentals', 'Adobe Premiere Pro mastery', 'Color grading & correction', 'Audio editing & mixing', 'Motion graphics basics', 'Export optimization'],
    modules: [{ title: 'Editing Fundamentals', lessons: 5 }, { title: 'Premiere Pro Mastery', lessons: 8 }, { title: 'Color Grading', lessons: 5 }, { title: 'Audio Editing', lessons: 4 }, { title: 'Motion Graphics', lessons: 4 }, { title: 'Portfolio Projects', lessons: 4 }],
    outcomes: ['Edit professional videos', 'Earn $100-$500 per video', 'Work with YouTubers & brands', 'Freelance or full-time roles'],
    image: 'https://images.unsplash.com/photo-1574717432707-c5719b277e44?w=800&h=500&fit=crop',
    popular: true
  }
]

const testimonials = [
  { name: 'Sarah Johnson', role: 'Social Media Manager', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', rating: 5, text: 'I went from zero knowledge to landing my first client in just 6 weeks.', featured: true },
  { name: 'Michael Chen', role: 'Facebook Ads Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', rating: 5, text: 'The hands-on approach is what sets this apart.', featured: true },
  { name: 'Amara Okafor', role: 'Virtual Assistant', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', rating: 5, text: 'As a stay-at-home mum, I needed flexibility. This program delivered.', featured: true },
  { name: 'David Martinez', role: 'Video Editor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', rating: 5, text: 'The job placement support is real. Life-changing!', featured: true },
  { name: 'Priya Sharma', role: 'Graphic Designer', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', rating: 5, text: 'I built a portfolio that got me hired by a top agency.', featured: true },
  { name: 'James Wilson', role: 'Digital Marketing Specialist', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', rating: 5, text: 'Best investment I ever made.', featured: true }
]

// Insert courses
const courseStmt = db.prepare(`
  INSERT INTO courses (title, slug, icon, level, duration, students, rating, price, shortDesc, description, whatYouLearn, modules, outcomes, image, popular)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const course of courses) {
  courseStmt.run(
    course.title, course.slug, course.icon, course.level, course.duration, course.students, course.rating, course.price, course.shortDesc, course.description,
    JSON.stringify(course.whatYouLearn), JSON.stringify(course.modules), JSON.stringify(course.outcomes), course.image, course.popular ? 1 : 0
  )
}
console.log('✅ Inserted', courses.length, 'courses')

// Insert testimonials
const testimonialStmt = db.prepare('INSERT INTO testimonials (name, role, image, rating, text, featured) VALUES (?, ?, ?, ?, ?, ?)')
for (const t of testimonials) {
  testimonialStmt.run(t.name, t.role, t.image, t.rating, t.text, t.featured ? 1 : 0)
}
console.log('✅ Inserted', testimonials.length, 'testimonials')

// Create default admin
const hashedPassword = bcrypt.hashSync('admin123', 10)
try {
  db.prepare('INSERT INTO admins (username, password, email, role) VALUES (?, ?, ?, ?)').run('admin', hashedPassword, 'admin@digitalcoursearena.com', 'superadmin')
  console.log('✅ Created admin user (username: admin, password: admin123)')
} catch (e) {
  console.log('ℹ️  Admin user already exists')
}

console.log('🎉 Database seeded successfully!')
