import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export const handler = async (request, context) => {
  try {
    const { method, headers, body } = request
    
    // Get path without /api prefix
    const url = new URL(request.url)
    const pathParts = url.pathname.replace('/api/', '').split('/')
    const resource = pathParts[0]
    const id = pathParts[1]

    // Handle different resources
    switch (resource) {
      case 'courses':
        return await handleCourses(request, method, id)
      case 'auth':
        return await handleAuth(request, method, pathParts[1])
      case 'testimonials':
        return await handleTestimonials(request, method, id)
      case 'enrollments':
        return await handleEnrollments(request, method, id)
      default:
        return Response.json({ error: 'Not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// Courses handler
async function handleCourses(request, method, id) {
  if (method === 'GET') {
    if (id) {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', id)
        .single()
      if (error || !data) return Response.json({ error: 'Course not found' }, { status: 404 })
      return Response.json(data)
    }
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
    return Response.json(data || [])
  }
  
  if (method === 'POST') {
    const body = await request.json()
    const { data, error } = await supabase.from('courses').insert([body]).select()
    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json(data[0], { status: 201 })
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

// Auth handler
async function handleAuth(request, method, action) {
  if (method === 'POST' && action === 'login') {
    const { username, password } = await request.json()
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single()
    
    if (error || !data) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    // Simple password check (in production, use bcrypt)
    if (data.password !== password) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    // Create a simple token (in production, use jwt)
    const token = btoa(JSON.stringify({ id: data.id, username: data.username }))
    return Response.json({
      token,
      admin: { id: data.id, username: data.username, email: data.email, role: data.role }
    })
  }
  
  return Response.json({ error: 'Invalid request' }, { status: 400 })
}

// Testimonials handler
async function handleTestimonials(request, method, id) {
  if (method === 'GET') {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    return Response.json(data || [])
  }
  
  if (method === 'POST') {
    const formData = await request.formData()
    const body = Object.fromEntries(formData)
    const { data, error } = await supabase.from('testimonials').insert([body]).select()
    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json(data[0], { status: 201 })
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

// Enrollments handler
async function handleEnrollments(request, method, id) {
  if (method === 'GET') {
    const { data } = await supabase.from('enrollments').select('*').order('created_at', { ascending: false })
    return Response.json(data || [])
  }
  
  if (method === 'POST') {
    const body = await request.json()
    const { data, error } = await supabase.from('enrollments').insert([body]).select()
    if (error) return Response.json({ error: error.message }, { status: 400 })
    return Response.json({ message: 'Enrollment submitted!' })
  }
  
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

export const config = {
  runtime: 'edge'
}
