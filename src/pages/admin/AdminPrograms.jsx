import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/api.js'

const emptyForm = {
  name: '',
  parentType: 'service',
  parentId: '',
  allow_optional_price: false,
}

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([])
  const [services, setServices] = useState([])
  const [appeals, setAppeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadAll = async () => {
    setLoading(true)
    try {
      const [programsRes, servicesRes, appealsRes] = await Promise.all([
        apiFetch('/admin/programs'),
        apiFetch('/admin/services'),
        apiFetch('/admin/appeals'),
      ])
      setPrograms(programsRes.data)
      setServices(servicesRes.data)
      setAppeals(appealsRes.data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setFieldErrors({})
  }

  const startEdit = (program) => {
    setForm({
      name: program.name,
      parentType: program.service_id ? 'service' : 'appeal',
      parentId: program.service_id ?? program.appeal_id,
      allow_optional_price: program.allow_optional_price,
    })
    setEditingId(program.id)
    setFieldErrors({})
  }

  const parentName = (program) => {
    if (program.service_id) {
      return services.find((s) => s.id === program.service_id)?.title ?? `Service #${program.service_id}`
    }
    return appeals.find((a) => a.id === program.appeal_id)?.title ?? `Appeal #${program.appeal_id}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setFieldErrors({})

    const body = {
      name: form.name,
      service_id: form.parentType === 'service' ? Number(form.parentId) : null,
      appeal_id: form.parentType === 'appeal' ? Number(form.parentId) : null,
      allow_optional_price: form.allow_optional_price,
    }

    try {
      if (editingId) {
        await apiFetch(`/admin/programs/${editingId}`, { method: 'PUT', body })
      } else {
        await apiFetch('/admin/programs', { method: 'POST', body })
      }
      resetForm()
      await loadAll()
    } catch (err) {
      setError(err.message)
      setFieldErrors(err.errors ?? {})
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (program) => {
    if (!confirm(`Delete "${program.name}"? This can't be undone.`)) return

    try {
      await apiFetch(`/admin/programs/${program.id}`, { method: 'DELETE' })
      await loadAll()
    } catch (err) {
      setError(err.message)
    }
  }

  const parentOptions = form.parentType === 'service' ? services : appeals

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Programs</h1>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-gray-900">{editingId ? 'Edit Program' : 'Add Program'}</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {fieldErrors.name && <p className="text-xs text-red-600 mt-1">{fieldErrors.name[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Belongs to *</label>
            <select
              value={form.parentType}
              onChange={(e) => setForm((f) => ({ ...f, parentType: e.target.value, parentId: '' }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="service">A Service</option>
              <option value="appeal">An Appeal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              {form.parentType === 'service' ? 'Service' : 'Appeal'} *
            </label>
            <select
              required
              value={form.parentId}
              onChange={(e) => setForm((f) => ({ ...f, parentId: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="" disabled>Select one...</option>
              {parentOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.title}</option>
              ))}
            </select>
            {fieldErrors.service_id && <p className="text-xs text-red-600 mt-1">{fieldErrors.service_id[0]}</p>}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={form.allow_optional_price}
            onChange={(e) => setForm((f) => ({ ...f, allow_optional_price: e.target.checked }))}
            className="w-4 h-4"
          />
          Allow a custom donation amount (not just fixed price options)
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold px-6 py-2.5 rounded-lg"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Program' : 'Add Program'}
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
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Belongs to</th>
                <th className="px-4 py-3">Custom amount?</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{program.name}</td>
                  <td className="px-4 py-3">
                    {parentName(program)}{' '}
                    <span className="text-xs text-gray-400">({program.service_id ? 'service' : 'appeal'})</span>
                  </td>
                  <td className="px-4 py-3">{program.allow_optional_price ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => startEdit(program)} className="text-green-800 font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(program)} className="text-red-600 font-semibold">
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

export default AdminPrograms
