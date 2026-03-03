// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`
  
  const config = {
    ...options,
    headers: {
      ...options.headers,
    }
  }

  // Add auth token if available
  const token = localStorage.getItem('adminToken')
  if (token && !endpoint.includes('/auth/login')) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`
    }
  }

  // Add content-type for non-form data
  if (!(options.body instanceof FormData)) {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(url, config)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

export default API_URL
