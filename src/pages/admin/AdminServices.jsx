import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { apiFetch, apiFetchForm } from '../../lib/api.js'
import ImageUploadField from '../../components/admin/ImageUploadField.jsx'

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
  const [editingImageUrl, setEditingImageUrl] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)

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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const resetForm = () => {
    setForm(emptyForm)
    setImageFile(null)
    setEditingId(null)
    setEditingImageUrl(null)
    setFieldErrors({})
  }

  const startCreate = () => {
    resetForm()
    scrollToForm()
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
    setEditingImageUrl(service.img ?? null)
    setFieldErrors({})
    scrollToForm()
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
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 scroll-mt-4">
        <h2 className="flex items-center gap-2 font-bold text-gray-900">
          <span className="h-2 w-2 rounded-full bg-red-600" />
          {editingId ? 'Edit Service' : 'Add Service'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Goal Amount (USD)</label>
            <input
              type="number"
              step="0.01"
              value={form.goal_amount}
              onChange={(e) => setForm((f) => ({ ...f, goal_amount: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
            />
          </div>

          <div className="flex items-center sm:items-end pb-0.5">
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

        <ImageUploadField
          file={imageFile}
          onChange={setImageFile}
          existingUrl={editingImageUrl}
          error={fieldErrors.img?.[0]}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-300 text-gray-700 font-bold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">All Services</h3>
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-1.5 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : services.length === 0 ? (
          <p className="p-6 text-gray-500">No services yet.</p>
        ) : (
          <>
            {/* Mobile: stacked cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {services.map((service) => (
                <div key={service.id} className="p-4 flex gap-3">
                  {service.img ? (
                    <img src={service.img} alt="" loading="lazy" decoding="async" className="w-14 h-14 shrink-0 rounded-lg object-cover border border-gray-200" />
                  ) : (
                    <div className="w-14 h-14 shrink-0 rounded-lg bg-gray-100" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-gray-900 truncate">{service.title}</p>
                      <span
                        className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {service.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {service.goal_amount ? `$${service.goal_amount} goal` : 'No goal'} · ${service.raised_amount} raised
                    </p>
                    <div className="flex gap-4 mt-2">
                      <button onClick={() => startEdit(service)} className="text-sm text-green-800 font-semibold hover:text-green-900">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(service)} className="text-sm text-red-600 font-semibold hover:text-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Image</th>
                    <th className="px-4 py-3 whitespace-nowrap">Title</th>
                    <th className="px-4 py-3 whitespace-nowrap">Goal</th>
                    <th className="px-4 py-3 whitespace-nowrap">Raised</th>
                    <th className="px-4 py-3 whitespace-nowrap">Active</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        {service.img ? (
                          <img src={service.img} alt="" loading="lazy" decoding="async" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{service.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{service.goal_amount ? `$${service.goal_amount}` : '—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">${service.raised_amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {service.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                        <button onClick={() => startEdit(service)} className="text-green-800 font-semibold hover:text-green-900">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(service)} className="text-red-600 font-semibold hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminServices
