import { useEffect, useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [meta, setMeta] = useState(null)
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [removing, setRemoving] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQ(q), 400)
    return () => clearTimeout(timeout)
  }, [q])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const query = new URLSearchParams({
          page: String(page),
          ...(debouncedQ ? { q: debouncedQ } : {}),
        })
        const res = await apiFetch(`/admin/users?${query}`)
        setUsers(res.data)
        setMeta(res.meta)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [debouncedQ, page])

  const handleRemove = async () => {
    if (!removing) return
    setDeletingId(removing.id)
    try {
      await apiFetch(`/admin/users/${removing.id}`, { method: 'DELETE' })
      setUsers((prev) => prev.filter((u) => u.id !== removing.id))
      setMeta((prev) => (prev ? { ...prev, total: prev.total - 1 } : prev))
      setError('')
    } catch (err) {
      setError(err.errors?.user?.[0] ?? err.message)
    } finally {
      setDeletingId(null)
      setRemoving(null)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Everyone with a donor account on the site (admin accounts aren't listed here).</p>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(1)
          }}
          placeholder="Search by name or email..."
          className="w-full sm:w-80 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-400"
        />
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : users.length === 0 ? (
          <p className="p-6 text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Name</th>
                  <th className="px-4 py-3 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 whitespace-nowrap">Country</th>
                  <th className="px-4 py-3 whitespace-nowrap">Joined</th>
                  <th className="px-4 py-3 whitespace-nowrap">Donations</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{user.email}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{user.country ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {user.donations_count > 0 ? (
                        <>
                          <span className="font-semibold text-gray-900">{user.donations_count}</span>
                          <span className="text-gray-500">
                            {' '}(${user.donations_total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                      {user.has_subscription && (
                        <span className="ml-2 inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          Recurring
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setRemoving(user)}
                        disabled={deletingId === user.id}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      <ConfirmDialog
        open={!!removing}
        title="Remove this user?"
        message={
          removing
            ? `${removing.name} (${removing.email}) will be permanently removed. Their past donations stay on record.`
            : ''
        }
        confirmLabel="Remove"
        onConfirm={handleRemove}
        onCancel={() => setRemoving(null)}
      />
    </div>
  )
}

export default AdminUsers
