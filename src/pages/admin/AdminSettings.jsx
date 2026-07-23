import { useState } from 'react'
import { apiFetch, setToken } from '../../lib/api.js'
import { useAuth } from '../../context/AuthContext.jsx'

const AdminSettings = () => {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const res = await apiFetch('/me/password', {
        method: 'PUT',
        body: {
          current_password: currentPassword,
          password,
          password_confirmation: passwordConfirmation,
        },
      })
      // Changing password revokes every other session's token too, so this
      // browser's own token was just invalidated along with the rest —
      // swap in the fresh one the endpoint returns to stay logged in.
      setToken(res.token)
      setSuccess(true)
      setCurrentPassword('')
      setPassword('')
      setPasswordConfirmation('')
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <p className="text-sm text-gray-500">
          Signed in as <span className="font-semibold text-gray-900">{user?.email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-bold text-gray-900">Change Password</h2>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              Password updated. Any other logged-in sessions were signed out.
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Current Password *</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">New Password *</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold px-6 py-2.5 rounded-lg"
          >
            {submitting ? 'Saving...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminSettings
