import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Seo from '../components/ui/Seo.jsx'
import loginBg from '../assets/images/login.png'

const Login = () => {
  const { user, login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Already logged in — nothing to do on this page. Also what makes "avoid
  // login/register at donation if logged in" work: donors who log in here
  // first arrive at checkout with `user` already set, so the donation
  // flow's auth gate never renders and their name/email are pre-filled.
  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register({ name, email, password, passwordConfirmation, country })
      }
      navigate('/')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 px-6 py-24">
      <Seo title="Login" noindex />
      <img src={loginBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-950">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'login'
              ? 'Log in to skip re-entering your details at checkout.'
              : 'Sign up to track your donations and manage recurring gifts.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm border-b border-gray-100 pb-4 mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={mode === 'login' ? 'font-bold text-green-800' : 'text-gray-500 hover:text-gray-700'}
          >
            Log in
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={mode === 'register' ? 'font-bold text-green-800' : 'text-gray-500 hover:text-gray-700'}
          >
            Sign up
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Country *</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-semibold text-gray-800">Password *</label>
              {mode === 'login' && (
                <Link to="/forgot-password" className="text-xs font-semibold text-green-800 hover:text-green-900">
                  Forgot password?
                </Link>
              )}
            </div>
            <input
              type="password"
              required
              minLength={mode === 'register' ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Confirm Password *</label>
              <input
                type="password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {submitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login
