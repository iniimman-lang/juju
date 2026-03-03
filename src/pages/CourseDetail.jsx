import { useParams, Link } from 'react-router-dom'
import { FaCheck, FaClock, FaCertificate, FaUsers, FaLaptop, FaStar, FaArrowLeft, FaPlay, FaBook, FaTasks, FaBriefcase } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import './CourseDetail.css'

const coursesData = [
  {
    id: 'social-media',
    title: 'Social Media Management',
    icon: 'FaBullhorn',
    duration: '8 weeks',
    level: 'Beginner',
    students: '250+',
    rating: 4.9,
    price: '$299',
    shortDesc: 'Help brands grow their online presence across all platforms.',
    description: 'Master the art of managing social media accounts for businesses. Learn content creation, community management, analytics, and strategy development across all major platforms including Instagram, Facebook, Twitter, LinkedIn, and TikTok.',
    whatYouLearn: [
      'Create engaging content calendars',
      'Grow organic following strategically',
      'Use analytics to optimize performance',
      'Manage multiple client accounts',
      'Create viral-worthy content',
      'Build brand voice and identity'
    ],
    modules: [
      { title: 'Foundation of Social Media', lessons: 5 },
      { title: 'Content Creation & Strategy', lessons: 8 },
      { title: 'Community Management', lessons: 4 },
      { title: 'Analytics & Reporting', lessons: 6 },
      { title: 'Client Management', lessons: 4 },
      { title: 'Building Your Portfolio', lessons: 3 }
    ],
    outcomes: [
      'Manage 3-5 client accounts',
      'Earn $1,500-$3,000 per client monthly',
      'Build a professional portfolio',
      'Get certified and job-ready'
    ],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop'
  },
  {
    id: 'facebook-ads',
    title: 'Facebook & Instagram Ads',
    icon: 'FaFacebook',
    duration: '6 weeks',
    level: 'Beginner to Intermediate',
    students: '180+',
    rating: 4.8,
    price: '$349',
    shortDesc: 'Master Meta ads to drive sales and conversions for businesses.',
    description: 'Become a certified Meta ads specialist. Learn to create, manage, and optimize high-converting ad campaigns on Facebook and Instagram. Master audience targeting, ad creative, budget optimization, and ROI tracking.',
    whatYouLearn: [
      'Set up Meta Business Manager',
      'Create high-converting ad creatives',
      'Target the perfect audience',
      'Optimize ad spend for maximum ROI',
      'A/B test ads effectively',
      'Track and report campaign performance'
    ],
    modules: [
      { title: 'Meta Ads Foundation', lessons: 4 },
      { title: 'Audience Targeting Mastery', lessons: 6 },
      { title: 'Ad Creative & Copywriting', lessons: 5 },
      { title: 'Campaign Optimization', lessons: 6 },
      { title: 'Retargeting Strategies', lessons: 4 },
      { title: 'Scaling & Reporting', lessons: 3 }
    ],
    outcomes: [
      'Run profitable ad campaigns',
      'Charge $500-$2,000 per setup',
      'Manage monthly ad budgets',
      'Get Meta certified'
    ],
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=500&fit=crop'
  },
  {
    id: 'tiktok-ads',
    title: 'TikTok Ads',
    icon: 'FaTiktok',
    duration: '4 weeks',
    level: 'Beginner',
    students: '120+',
    rating: 4.7,
    price: '$249',
    shortDesc: 'Tap into the fastest-growing platform for viral marketing.',
    description: 'Learn to create and manage TikTok ad campaigns that go viral. Understand the unique TikTok algorithm, create thumb-stopping content, and leverage trends for maximum engagement and conversions.',
    whatYouLearn: [
      'Understand TikTok algorithm',
      'Create viral ad content',
      'Use TikTok Ads Manager',
      'Leverage trending sounds and effects',
      'Target Gen Z and Millennial audiences',
      'Measure campaign success'
    ],
    modules: [
      { title: 'TikTok Platform Basics', lessons: 3 },
      { title: 'Viral Content Creation', lessons: 6 },
      { title: 'TikTok Ads Manager', lessons: 5 },
      { title: 'Trend Marketing', lessons: 4 }
    ],
    outcomes: [
      'Create viral TikTok ads',
      'Earn $1,000-$2,500 per campaign',
      'Work with e-commerce brands',
      'Build a TikTok portfolio'
    ],
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=500&fit=crop'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'FaBullhorn',
    duration: '10 weeks',
    level: 'All Levels',
    students: '300+',
    rating: 4.9,
    price: '$499',
    shortDesc: 'Learn complete online sales funnels and marketing strategies.',
    description: 'Become a full-stack digital marketer. Master SEO, email marketing, content marketing, paid ads, social media, and analytics. Learn to build complete marketing funnels that convert.',
    whatYouLearn: [
      'SEO and content marketing',
      'Email marketing automation',
      'Sales funnel creation',
      'Multi-channel marketing',
      'Google Analytics mastery',
      'Marketing strategy development'
    ],
    modules: [
      { title: 'Digital Marketing Fundamentals', lessons: 6 },
      { title: 'SEO Mastery', lessons: 8 },
      { title: 'Email Marketing', lessons: 5 },
      { title: 'Paid Advertising', lessons: 7 },
      { title: 'Analytics & Data', lessons: 6 },
      { title: 'Strategy & Planning', lessons: 4 }
    ],
    outcomes: [
      'Work as marketing manager',
      'Earn $3,000-$6,000 monthly',
      'Handle complete marketing',
      'Start your own agency'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop'
  },
  {
    id: 'virtual-assistant',
    title: 'Virtual Assistant',
    icon: 'FaEnvelope',
    duration: '8 weeks',
    level: 'Beginner',
    students: '200+',
    rating: 4.8,
    price: '$279',
    shortDesc: 'Provide remote administrative and creative support to executives.',
    description: 'Launch your career as a professional virtual assistant. Learn administrative tasks, communication tools, time management, client relations, and specialized skills like calendar management and travel planning.',
    whatYouLearn: [
      'Essential VA tools and software',
      'Email and calendar management',
      'Client communication skills',
      'Time management & productivity',
      'Travel planning & booking',
      'Basic bookkeeping'
    ],
    modules: [
      { title: 'VA Fundamentals', lessons: 5 },
      { title: 'Tools & Software', lessons: 6 },
      { title: 'Communication Mastery', lessons: 4 },
      { title: 'Task Management', lessons: 5 },
      { title: 'Client Relations', lessons: 4 },
      { title: 'Finding Clients', lessons: 3 }
    ],
    outcomes: [
      'Work with international clients',
      'Earn $15-$40 per hour',
      'Flexible remote work',
      'Build long-term contracts'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    icon: 'FaPenNib',
    duration: '10 weeks',
    level: 'Beginner',
    students: '220+',
    rating: 4.9,
    price: '$399',
    shortDesc: 'Create stunning visuals for ads, brands, and marketing materials.',
    description: 'Master graphic design from scratch. Learn Adobe Photoshop, Illustrator, and Canva. Create logos, social media graphics, marketing materials, and brand identities that stand out.',
    whatYouLearn: [
      'Design principles & typography',
      'Adobe Photoshop mastery',
      'Adobe Illustrator essentials',
      'Brand identity design',
      'Social media graphics',
      'Client presentation skills'
    ],
    modules: [
      { title: 'Design Fundamentals', lessons: 6 },
      { title: 'Photoshop Mastery', lessons: 8 },
      { title: 'Illustrator Essentials', lessons: 7 },
      { title: 'Brand Identity', lessons: 5 },
      { title: 'Marketing Materials', lessons: 4 },
      { title: 'Building Portfolio', lessons: 4 }
    ],
    outcomes: [
      'Create professional designs',
      'Charge $50-$500 per project',
      'Build design portfolio',
      'Work with global clients'
    ],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&h=500&fit=crop'
  },
  {
    id: 'whatsapp-marketing',
    title: 'WhatsApp Marketing',
    icon: 'FaWhatsapp',
    duration: '4 weeks',
    level: 'Beginner',
    students: '150+',
    rating: 4.6,
    price: '$199',
    shortDesc: 'Help businesses sell directly through WhatsApp conversations.',
    description: 'Learn the power of conversational marketing. Master WhatsApp Business, create automated sequences, build contact lists, and drive sales through personalized messaging.',
    whatYouLearn: [
      'WhatsApp Business setup',
      'Broadcast list strategies',
      'Automated message sequences',
      'Customer relationship management',
      'Sales conversation techniques',
      'Compliance and best practices'
    ],
    modules: [
      { title: 'WhatsApp Business Basics', lessons: 3 },
      { title: 'Building Contact Lists', lessons: 4 },
      { title: 'Message Automation', lessons: 5 },
      { title: 'Sales Through WhatsApp', lessons: 4 }
    ],
    outcomes: [
      'Help businesses sell via WhatsApp',
      'Earn $500-$1,500 per client',
      'Set up WhatsApp systems',
      'Work with local businesses'
    ],
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=500&fit=crop'
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    icon: 'FaVideo',
    duration: '8 weeks',
    level: 'Beginner to Intermediate',
    students: '190+',
    rating: 4.8,
    price: '$379',
    shortDesc: 'Edit engaging content for creators, brands, and social media.',
    description: 'Become a professional video editor. Learn Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve. Edit YouTube videos, social media content, commercials, and more.',
    whatYouLearn: [
      'Video editing fundamentals',
      'Adobe Premiere Pro mastery',
      'Color grading & correction',
      'Audio editing & mixing',
      'Motion graphics basics',
      'Export optimization'
    ],
    modules: [
      { title: 'Editing Fundamentals', lessons: 5 },
      { title: 'Premiere Pro Mastery', lessons: 8 },
      { title: 'Color Grading', lessons: 5 },
      { title: 'Audio Editing', lessons: 4 },
      { title: 'Motion Graphics', lessons: 4 },
      { title: 'Portfolio Projects', lessons: 4 }
    ],
    outcomes: [
      'Edit professional videos',
      'Earn $100-$500 per video',
      'Work with YouTubers & brands',
      'Freelance or full-time roles'
    ],
    image: 'https://images.unsplash.com/photo-1574717432707-c5719b277e44?w=800&h=500&fit=crop'
  }
]

function CourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const found = coursesData.find(c => c.id === courseId)
    setCourse(found)
  }, [courseId])

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <Link to="/" className="btn primary">Back to Home</Link>
      </div>
    )
  }

  return (
    <main className="course-detail-page">
      {/* Hero Section */}
      <section className="course-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Home
          </Link>
          <div className="course-hero-content">
            <div className="course-hero-text">
              <span className="course-badge">{course.level} Level</span>
              <h1>{course.title}</h1>
              <p className="course-hero-desc">{course.description}</p>
              <div className="course-stats">
                <div className="stat">
                  <FaClock />
                  <span>{course.duration}</span>
                </div>
                <div className="stat">
                  <FaUsers />
                  <span>{course.students} Students</span>
                </div>
                <div className="stat">
                  <FaStar />
                  <span>{course.rating} Rating</span>
                </div>
              </div>
              <div className="course-hero-ctas">
                <a href="#enroll" className="btn primary btn-large">Enroll Now - {course.price}</a>
                <a href="#curriculum" className="btn btn-large btn-outline">View Curriculum</a>
              </div>
            </div>
            <div className="course-hero-image">
              <img src={course.image} alt={course.title} />
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="course-section">
        <div className="container">
          <h2>What You'll Learn</h2>
          <div className="learn-grid">
            {course.whatYouLearn.map((item, index) => (
              <div className="learn-item" key={index}>
                <FaCheck className="check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="course-section modules-section" id="curriculum">
        <div className="container">
          <h2>Course Curriculum</h2>
          <div className="modules-grid">
            {course.modules.map((module, index) => (
              <div className="module-card" key={index}>
                <div className="module-header">
                  <span className="module-number">Module {index + 1}</span>
                  <FaBook />
                </div>
                <h3>{module.title}</h3>
                <p>{module.lessons} lessons</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="course-section outcomes-section">
        <div className="container">
          <h2>After This Course</h2>
          <div className="outcomes-grid">
            {course.outcomes.map((outcome, index) => (
              <div className="outcome-card" key={index}>
                <div className="outcome-icon"><FaBriefcase /></div>
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="course-cta" id="enroll">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join hundreds of successful students and transform your career today.</p>
            <div className="cta-price">
              <span className="price">{course.price}</span>
              <span className="price-desc">One-time payment, lifetime access</span>
            </div>
            <button className="btn primary btn-large">Enroll Now</button>
            <div className="guarantee">
              <FaCertificate />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CourseDetail
