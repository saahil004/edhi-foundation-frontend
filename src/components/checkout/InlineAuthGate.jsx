import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

const InlineAuthGate = ({ name, email, onAuthenticated, optional = false }) => {
  const { login, register } = useAuth()
  const [expanded, setExpanded] = useState(!optional)
  const [mode, setMode] = useState(optional ? 'login' : 'register')
  // Register uses the name/email already typed into the donor details form
  // above (that becomes the new account). Login is a separate, possibly
  // pre-existing account, so it needs its own field — the donor may click
  // "Log in" before typing anything above, especially in the optional flow.
  const [loginEmail, setLoginEmail] = useState(email || '')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const loggedInUser = mode === 'login'
        ? await login(loginEmail, password)
        : await register({ name, email, password, passwordConfirmation, country })
      onAuthenticated(loggedInUser)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  if (optional && !expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="w-full text-left bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        Already have an account? <span className="font-bold text-green-800">Log in</span> to skip re-entering your details — or just continue below as a guest.
      </button>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-gray-900">
            {optional
              ? (mode === 'login' ? 'Log in to skip re-entering your details' : 'Create an account')
              : (mode === 'login' ? 'Log in to set up your recurring donation' : 'Create an account for your recurring donation')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {optional
              ? 'Completely optional — you can always donate as a guest instead.'
              : 'Recurring donations need an account so you can view or cancel them later. One-time donations never require this.'}
          </p>
        </div>

        {optional && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="text-sm text-gray-400 hover:text-gray-600 shrink-0"
          >
            Continue as guest
          </button>
        )}
      </div>

      <div className="flex gap-3 text-sm border-b border-gray-100 pb-3">
        <button
          type="button"
          onClick={() => setMode('register')}
          className={mode === 'register' ? 'font-bold text-green-800' : 'text-gray-500 hover:text-gray-700'}
        >
          New donor
        </button>
        <span className="text-gray-300">|</span>
        <button
          type="button"
          onClick={() => setMode('login')}
          className={mode === 'login' ? 'font-bold text-green-800' : 'text-gray-500 hover:text-gray-700'}
        >
          Already have an account
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'login' && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            />
          </div>
        )}

        {mode === 'register' && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Country *</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Password *</label>
          <input
            type="password"
            required
            minLength={mode === 'register' ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-800 hover:bg-green-900 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition-colors"
        >
          {submitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account & continue'}
        </button>
      </form>
    </div>
  )
}

export default InlineAuthGate
