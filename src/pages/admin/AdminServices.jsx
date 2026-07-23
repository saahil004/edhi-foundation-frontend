import { useEffect, useState } from 'react'
import { apiFetch, apiFetchForm } from '../../lib/api.js'

const emptyForm = {
  title: '',
  slug: '',
  description: '',
  goal_amount: '',
  is_active: true,
  sort_order: 0,
}

const AdminServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadServices = async () => {
    setLoading(true)
    try {
      const res = await apiFetch('/admin/services')
      setServices(res.data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setImageFile(null)
    setEditingId(null)
    setFieldErrors({})
  }

  const startEdit = (service) => {
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description ?? '',
      goal_amount: service.goal_amount ?? '',
      is_active: service.is_active,
      sort_order: service.sort_order ?? 0,
    })
    setImageFile(null)
    setEditingId(service.id)
    setFieldErrors({})
  }

  const buildFormData = () => {
    const fd = new FormData()
    fd.append('title', form.title)
    if (form.slug) fd.append('slug', form.slug)
    fd.append('description', form.description)
    if (form.goal_amount !== '') fd.append('goal_amount', form.goal_amount)
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
        await apiFetchForm(`/admin/services/${editingId}`, formData, { method: 'PUT' })
      } else {
        await apiFetchForm('/admin/services', formData, { method: 'POST' })
      }
      resetForm()
      await loadServices()
    } catch (err) {
      setError(err.message)
      setFieldErrors(err.errors ?? {})
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (service) => {
    if (!confirm(`Delete "${service.title}"? This can't be undone.`)) return

    try {
      await apiFetch(`/admin/services/${service.id}`, { method: 'DELETE' })
      await loadServices()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Services</h1>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-gray-900">{editingId ? 'Edit Service' : 'Add Service'}</h2>

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
            <label className="block text-sm font-semibold text-gray-800 mb-1">Goal Amount (USD)</label>
            <input
              type="number"
              step="0.01"
              value={form.goal_amount}
              onChange={(e) => setForm((f) => ({ ...f, goal_amount: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

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
            {submitting ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
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
                <th className="px-4 py-3">Goal</th>
                <th className="px-4 py-3">Raised</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    {service.img ? (
                      <img src={service.img} alt="" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-100" />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{service.title}</td>
                  <td className="px-4 py-3">{service.goal_amount ? `$${service.goal_amount}` : '—'}</td>
                  <td className="px-4 py-3">${service.raised_amount}</td>
                  <td className="px-4 py-3">
                    <span className={service.is_active ? 'text-green-700' : 'text-gray-400'}>
                      {service.is_active ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => startEdit(service)} className="text-green-800 font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(service)} className="text-red-600 font-semibold">
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

export default AdminServices
