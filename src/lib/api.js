const API_URL = import.meta.env.VITE_API_URL

const TOKEN_KEY = 'auth_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

/**
 * @param {string} path e.g. '/services'
 * @param {{method?: string, body?: object, isFormData?: boolean}} options
 */
export async function apiFetch(path, options = {}) {
  const { method = 'GET', body, isFormData = false } = options
  const token = getToken()

  const headers = {
    Accept: 'application/json',
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const error = new Error(data?.message ?? `Request failed (${response.status})`)
    error.status = response.status
    error.errors = data?.errors ?? null
    throw error
  }

  return data
}

/**
 * Laravel doesn't parse multipart bodies on PUT/PATCH requests (a PHP
 * limitation), so file-upload updates must be sent as POST with a
 * `_method` field — this wraps that so callers don't have to remember it.
 */
export async function apiFetchForm(path, formData, { method = 'POST' } = {}) {
  let actualMethod = method

  if (method === 'PUT' || method === 'PATCH') {
    formData.append('_method', method)
    actualMethod = 'POST'
  }

  return apiFetch(path, { method: actualMethod, body: formData, isFormData: true })
}
