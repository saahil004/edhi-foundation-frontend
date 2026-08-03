import { useEffect, useRef, useState } from 'react'
import { Paperclip, Search, Send, Trash2, X } from 'lucide-react'
import { apiFetch, apiFetchForm } from '../../lib/api.js'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'

const AdminNewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([])
  const [meta, setMeta] = useState(null)
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [attachment, setAttachment] = useState(null)
  const fileInputRef = useRef(null)
  const [confirming, setConfirming] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState(null)
  const [sendError, setSendError] = useState('')

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
        const res = await apiFetch(`/admin/newsletter-subscribers?${query}`)
        setSubscribers(res.data)
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
      await apiFetch(`/admin/newsletter-subscribers/${removing.id}`, { method: 'DELETE' })
      setSubscribers((prev) => prev.filter((s) => s.id !== removing.id))
      setMeta((prev) => (prev ? { ...prev, total: prev.total - 1 } : prev))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setDeletingId(null)
      setRemoving(null)
    }
  }

  const totalSubscribers = meta?.total ?? 0
  const canSend = subject.trim().length > 0 && body.trim().length > 0 && totalSubscribers > 0

  const handleSend = async () => {
    setConfirming(false)
    setSending(true)
    setSendResult(null)
    setSendError('')
    try {
      const formData = new FormData()
      formData.append('subject', subject)
      formData.append('body', body)
      if (attachment) formData.append('document', attachment)

      const res = await apiFetchForm('/admin/newsletter-subscribers/broadcast', formData)
      setSendResult(res.sent)
      setSubject('')
      setBody('')
      setAttachment(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setSendError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Everyone who subscribed to the newsletter through the site footer.</p>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
        <div>
          <h3 className="font-bold text-gray-900">Compose Email</h3>
          <p className="text-sm text-gray-500">
            Sends immediately to all {totalSubscribers} subscriber{totalSubscribers === 1 ? '' : 's'}.
          </p>
        </div>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-400"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your message..."
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-400 resize-y"
        />

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
            className="hidden"
            id="newsletter-attachment"
          />
          {attachment ? (
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-fit">
              <Paperclip size={14} className="shrink-0 text-gray-400" />
              <span className="truncate">{attachment.name}</span>
              <button
                type="button"
                onClick={() => {
                  setAttachment(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                aria-label="Remove attachment"
                className="ml-1 text-gray-400 hover:text-red-600 shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="newsletter-attachment"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <Paperclip size={14} />
              Attach a document (optional)
            </label>
          )}
        </div>

        {sendResult !== null && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            Sent to {sendResult} subscriber{sendResult === 1 ? '' : 's'}.
          </div>
        )}
        {sendError && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{sendError}</div>
        )}

        <button
          onClick={() => setConfirming(true)}
          disabled={!canSend || sending}
          className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          <Send size={16} />
          {sending ? 'Sending...' : `Send to ${totalSubscribers} Subscriber${totalSubscribers === 1 ? '' : 's'}`}
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(1)
          }}
          placeholder="Search by email..."
          className="w-full sm:w-80 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-400"
        />
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : subscribers.length === 0 ? (
          <p className="p-6 text-gray-500">No subscribers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 whitespace-nowrap">Subscribed On</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{subscriber.email}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(subscriber.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setRemoving(subscriber)}
                        disabled={deletingId === subscriber.id}
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
        open={confirming}
        title="Send this email now?"
        message={`This will immediately email all ${totalSubscribers} subscriber${totalSubscribers === 1 ? '' : 's'}. This can't be undone.`}
        confirmLabel="Send"
        onConfirm={handleSend}
        onCancel={() => setConfirming(false)}
      />

      <ConfirmDialog
        open={!!removing}
        title="Remove this subscriber?"
        message={removing ? `${removing.email} will stop receiving newsletter emails.` : ''}
        confirmLabel="Remove"
        onConfirm={handleRemove}
        onCancel={() => setRemoving(null)}
      />
    </div>
  )
}

export default AdminNewsletterSubscribers
