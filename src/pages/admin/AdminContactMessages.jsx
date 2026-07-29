import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import ContactMessageModal from '../../components/admin/ContactMessageModal.jsx'

const statusOptions = ['', 'new', 'handled']

const statusColors = {
  new: 'bg-yellow-100 text-yellow-800',
  handled: 'bg-green-100 text-green-800',
}

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([])
  const [meta, setMeta] = useState(null)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)

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
          ...(status ? { status } : {}),
          ...(debouncedQ ? { q: debouncedQ } : {}),
        })
        const res = await apiFetch(`/admin/contact-messages?${query}`)
        setMessages(res.data)
        setMeta(res.meta)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [status, debouncedQ, page])

  const toggleStatus = async (message) => {
    const nextStatus = message.status === 'new' ? 'handled' : 'new'
    setUpdatingId(message.id)
    try {
      await apiFetch(`/admin/contact-messages/${message.id}`, { method: 'PATCH', body: { status: nextStatus } })
      setMessages((prev) => prev.map((m) => (m.id === message.id ? { ...m, status: nextStatus } : m)))
      setSelectedMessage((prev) => (prev?.id === message.id ? { ...prev, status: nextStatus } : prev))
    } catch (err) {
      setError(err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Every message submitted through the Contact Us form.</p>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setPage(1)
            }}
            placeholder="Search by name, email, or message..."
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-400"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option ? option[0].toUpperCase() + option.slice(1) : 'All statuses'}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="p-6 text-gray-500">No messages found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Sender</th>
                  <th className="px-4 py-3 whitespace-nowrap">Message</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors align-top">
                    <td className="px-4 py-3 min-w-[180px]">
                      <div className="font-medium text-gray-900 whitespace-nowrap">{message.first_name} {message.last_name}</div>
                      <div className="text-gray-500 text-xs whitespace-nowrap">{message.email}</div>
                      <div className="text-gray-500 text-xs whitespace-nowrap">{message.phone}</div>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="truncate">
                        {message.message || <span className="text-gray-400 italic">No message</span>}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize whitespace-nowrap ${
                          statusColors[message.status] ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {message.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(message.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedMessage(message)}
                          className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => toggleStatus(message)}
                          disabled={updatingId === message.id}
                          className="text-xs font-semibold text-green-800 hover:text-green-900 disabled:opacity-50"
                        >
                          {message.status === 'new' ? 'Mark handled' : 'Mark new'}
                        </button>
                      </div>
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

      <ContactMessageModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
        onToggleStatus={toggleStatus}
        updating={updatingId === selectedMessage?.id}
      />
    </div>
  )
}

export default AdminContactMessages
