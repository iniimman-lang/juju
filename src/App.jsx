import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

// Public Pages
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import HowItWorks from './pages/HowItWorks'
import FAQ from './pages/FAQ'
import Enroll from './pages/Enroll'

// Admin Pages
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import Dashboard from './admin/Dashboard'
import Courses from './admin/Courses'
import Testimonials from './admin/Testimonials'
import Enrollments from './admin/Enrollments'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!admin) return <Navigate to="/admin/login" />
  return children
}

// Public Route Component (redirect if logged in)
function PublicRoute({ children }) {
  const { admin, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (admin) return <Navigate to="/admin/dashboard" />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Website Routes */}
      <Route path="/" element={
        <>
          <Header />
          <Home />
          <Footer />
        </>
      } />
      <Route path="/course/:courseId" element={
        <>
          <Header />
          <CourseDetail />
          <Footer />
        </>
      } />
      <Route path="/how-it-works" element={
        <>
          <Header />
          <HowItWorks />
          <Footer />
        </>
      } />
      <Route path="/faq" element={
        <>
          <Header />
          <FAQ />
          <Footer />
        </>
      } />
      <Route path="/enroll" element={
        <>
          <Header />
          <Enroll />
          <Footer />
        </>
      } />

      {/* Admin Routes */}
      <Route path="/admin/login" element={
        <PublicRoute>
          <AdminLogin />
        </PublicRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="enrollments" element={<Enrollments />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
