import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const pathParts = url.pathname.replace('/api/', '').split('/')
    const resource = pathParts[0]
    const id = pathParts[1]

    // Auth me endpoint
    if (resource === 'auth' && id === 'me') {
      const authHeader = request.headers.get('authorization')
      const token = authHeader?.split(' ')[1]
      if (!token) {
        return Response.json({ error: 'No token' }, { status: 401 })
      }
      try {
        const decoded = JSON.parse(atob(token))
        const { data, error } = await supabase
          .from('admins')
          .select('id, username, email, role')
          .eq('id', decoded.id)
          .single()
        if (error || !data) {
          return Response.json({ error: 'Admin not found' }, { status: 404 })
        }
        return Response.json(data)
      } catch {
        return Response.json({ error: 'Invalid token' }, { status: 403 })
      }
    }

    if (resource === 'courses') {
      if (id) {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', id)
          .single()
        if (error || !data) {
          return Response.json({ error: 'Course not found' }, { status: 404 })
        }
        return Response.json(data)
      }
      const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
      return Response.json(data || [])
    }

    if (resource === 'testimonials') {
      const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      return Response.json(data || [])
    }

    if (resource === 'enrollments') {
      const { data } = await supabase.from('enrollments').select('*').order('created_at', { ascending: false })
      return Response.json(data || [])
    }

    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const url = new URL(request.url)
    const pathParts = url.pathname.replace('/api/', '').split('/')
    const resource = pathParts[0]

    if (resource === 'auth' && pathParts[1] === 'login') {
      const { username, password } = await request.json()
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single()
      
      if (error || !data || data.password !== password) {
        return Response.json({ error: 'Invalid credentials' }, { status: 401 })
      }
      
      const token = btoa(JSON.stringify({ id: data.id, username: data.username }))
      return Response.json({
        token,
        admin: { id: data.id, username: data.username, email: data.email, role: data.role }
      })
    }

    if (resource === 'enrollments') {
      const body = await request.json()
      await supabase.from('enrollments').insert([body])
      return Response.json({ message: 'Enrollment submitted!' }, { status: 201 })
    }

    if (resource === 'testimonials') {
      const formData = await request.formData()
      const body = Object.fromEntries(formData)
      const { data } = await supabase.from('testimonials').insert([body]).select()
      return Response.json(data[0], { status: 201 })
    }

    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const url = new URL(request.url)
    const pathParts = url.pathname.replace('/api/', '').split('/')
    const resource = pathParts[0]
    const id = pathParts[1]

    if (resource === 'enrollments' && id) {
      const body = await request.json()
      const { data, error } = await supabase
        .from('enrollments')
        .update(body)
        .eq('id', id)
        .select()
      if (error) throw error
      return Response.json({ id, status: body.status, updated: data?.[0] })
    }

    return Response.json({ error: 'Not found' }, { status: 404 })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export const config = {
  runtime: 'edge'
}
