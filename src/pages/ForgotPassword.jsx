import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../lib/api.js'
import loginBg from '../assets/images/login.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'sent'
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      // Backend always returns the same generic message whether or not the
      // email matches an account — nothing here should ever branch on that.
      await apiFetch('/forgot-password', { method: 'POST', body: { email } })
      setStatus('sent')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <main className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 px-6 py-24">
      <img src={loginBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-950">Forgot your password?</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email and we'll send you a link to reset it.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-center">
            If an account exists for that email, a password reset link has been sent. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
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

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {status === 'submitting' ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link to="/login" className="font-semibold text-green-800 hover:text-green-900">
            Back to log in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default ForgotPassword
