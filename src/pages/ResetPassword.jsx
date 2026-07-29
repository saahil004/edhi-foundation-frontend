import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiFetch } from '../lib/api.js'
import loginBg from '../assets/images/login.png'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const email = searchParams.get('email') ?? ''

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success'
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      await apiFetch('/reset-password', {
        method: 'POST',
        body: { token, email, password, password_confirmation: passwordConfirmation },
      })
      setStatus('success')
    } catch (err) {
      setError(err.message || 'This reset link may have expired. Please request a new one.')
      setStatus('idle')
    }
  }

  // A link missing its token/email is unusable — nothing to submit.
  if (!token || !email) {
    return (
      <main className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 px-6 py-24">
        <img src={loginBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid reset link</h1>
          <p className="text-sm text-gray-500 mb-4">
            This password reset link is missing required information. Please request a new one.
          </p>
          <Link to="/forgot-password" className="font-semibold text-green-800 hover:text-green-900">
            Request a new link
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 px-6 py-24">
      <img src={loginBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-950">Reset your password</h1>
          <p className="text-sm text-gray-500 mt-1">{email}</p>
        </div>

        {status === 'success' ? (
          <div className="text-center space-y-4">
            <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              Your password has been reset successfully.
            </div>
            <Link
              to="/login"
              className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Log in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">New password *</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Confirm new password *</label>
              <input
                type="password"
                required
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {status === 'submitting' ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}

export default ResetPassword
