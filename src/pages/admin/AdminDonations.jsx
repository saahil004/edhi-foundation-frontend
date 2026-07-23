import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/api.js'

const statusOptions = ['', 'pending', 'completed', 'failed', 'refunded']

const statusColors = {
  pending: 'text-yellow-700',
  completed: 'text-green-700',
  failed: 'text-red-600',
  refunded: 'text-gray-500',
}

const AdminDonations = () => {
  const [donations, setDonations] = useState([])
  const [meta, setMeta] = useState(null)
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const query = new URLSearchParams({ page: String(page), ...(status ? { status } : {}) })
        const res = await apiFetch(`/admin/donations?${query}`)
        setDonations(res.data)
        setMeta(res.meta)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [status, page])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Donations</h1>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>{option ? option[0].toUpperCase() + option.slice(1) : 'All statuses'}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : donations.length === 0 ? (
          <p className="p-6 text-gray-500">No donations found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Donor</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{donation.program?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{donation.donor_name ?? '—'}</div>
                    <div className="text-gray-500 text-xs">{donation.donor_email}</div>
                    <div className="text-gray-500 text-xs">{donation.donor_phone}</div>
                    <span
                      className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        donation.user_id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {donation.user_id ? 'Registered' : 'Guest'}
                    </span>
                  </td>
                  <td className="px-4 py-3">${donation.amount}</td>
                  <td className={`px-4 py-3 font-semibold ${statusColors[donation.status] ?? ''}`}>
                    {donation.status}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(donation.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {meta && meta.last_page > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {meta.current_page} of {meta.last_page}</span>
          <button
            disabled={page >= meta.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminDonations
