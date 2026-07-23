import { useEffect, useState } from 'react'
import { apiFetch, apiFetchForm } from '../../lib/api.js'

const emptyForm = {
  title: '',
  slug: '',
  description: '',
  is_active: true,
  sort_order: 0,
}

const AdminAppeals = () => {
  const [appeals, setAppeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadAppeals = async () => {
    setLoading(true)
    try {
      const res = await apiFetch('/admin/appeals')
      setAppeals(res.data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppeals()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setImageFile(null)
    setEditingId(null)
    setFieldErrors({})
  }

  const startEdit = (appeal) => {
    setForm({
      title: appeal.title,
      slug: appeal.slug,
      description: appeal.description ?? '',
      is_active: appeal.is_active,
      sort_order: appeal.sort_order ?? 0,
    })
    setImageFile(null)
    setEditingId(appeal.id)
    setFieldErrors({})
  }

  const buildFormData = () => {
    const fd = new FormData()
    fd.append('title', form.title)
    if (form.slug) fd.append('slug', form.slug)
    fd.append('description', form.description)
    fd.append('is_active', form.is_active ? '1' : '0')
    fd.append('sort_order', form.sort_order)
    if (imageFile) fd.append('img', imageFile)
    return fd
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setFieldErrors({})

    try {
      const formData = buildFormData()
      if (editingId) {
        await apiFetchForm(`/admin/appeals/${editingId}`, formData, { method: 'PUT' })
      } else {
        await apiFetchForm('/admin/appeals', formData, { method: 'POST' })
      }
      resetForm()
      await loadAppeals()
    } catch (err) {
      setError(err.message)
      setFieldErrors(err.errors ?? {})
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (appeal) => {
    if (!confirm(`Delete "${appeal.title}"? This can't be undone.`)) return

    try {
      await apiFetch(`/admin/appeals/${appeal.id}`, { method: 'DELETE' })
      await loadAppeals()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Appeals</h1>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-gray-900">{editingId ? 'Edit Appeal' : 'Add Appeal'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {fieldErrors.title && <p className="text-xs text-red-600 mt-1">{fieldErrors.title[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="auto-generated from title if left blank"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {fieldErrors.slug && <p className="text-xs text-red-600 mt-1">{fieldErrors.slug[0]}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                className="w-4 h-4"
              />
              Active
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Image</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
          {fieldErrors.img && <p className="text-xs text-red-600 mt-1">{fieldErrors.img[0]}</p>}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold px-6 py-2.5 rounded-lg"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Appeal' : 'Add Appeal'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-300 text-gray-700 font-bold px-6 py-2.5 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {appeals.map((appeal) => (
                <tr key={appeal.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    {appeal.img ? (
                      <img src={appeal.img} alt="" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-100" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{appeal.title}</td>
                  <td className="px-4 py-3">
                    <span className={appeal.is_active ? 'text-green-700' : 'text-gray-400'}>
                      {appeal.is_active ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => startEdit(appeal)} className="text-green-800 font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(appeal)} className="text-red-600 font-semibold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminAppeals
