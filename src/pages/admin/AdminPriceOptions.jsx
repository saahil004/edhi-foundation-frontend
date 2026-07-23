import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/api.js'

const emptyForm = { name: '', price: '', program_id: '' }

const AdminPriceOptions = () => {
  const [priceOptions, setPriceOptions] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadAll = async () => {
    setLoading(true)
    try {
      const [priceOptionsRes, programsRes] = await Promise.all([
        apiFetch('/admin/price-options'),
        apiFetch('/admin/programs'),
      ])
      setPriceOptions(priceOptionsRes.data)
      setPrograms(programsRes.data)
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

  const startEdit = (priceOption) => {
    setForm({
      name: priceOption.name,
      price: priceOption.price,
      program_id: priceOption.program_id,
    })
    setEditingId(priceOption.id)
    setFieldErrors({})
  }

  const programName = (programId) => programs.find((p) => p.id === programId)?.name ?? `Program #${programId}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setFieldErrors({})

    const body = { name: form.name, price: Number(form.price), program_id: Number(form.program_id) }

    try {
      if (editingId) {
        await apiFetch(`/admin/price-options/${editingId}`, { method: 'PUT', body })
      } else {
        await apiFetch('/admin/price-options', { method: 'POST', body })
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

  const handleDelete = async (priceOption) => {
    if (!confirm(`Delete "${priceOption.name}"? This can't be undone.`)) return

    try {
      await apiFetch(`/admin/price-options/${priceOption.id}`, { method: 'DELETE' })
      await loadAll()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Price Options</h1>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-gray-900">{editingId ? 'Edit Price Option' : 'Add Price Option'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Price (USD) *</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {fieldErrors.price && <p className="text-xs text-red-600 mt-1">{fieldErrors.price[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Program *</label>
            <select
              required
              value={form.program_id}
              onChange={(e) => setForm((f) => ({ ...f, program_id: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="" disabled>Select a program...</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>{program.name}</option>
              ))}
            </select>
            {fieldErrors.program_id && <p className="text-xs text-red-600 mt-1">{fieldErrors.program_id[0]}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold px-6 py-2.5 rounded-lg"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Price Option' : 'Add Price Option'}
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
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {priceOptions.map((priceOption) => (
                <tr key={priceOption.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{priceOption.name}</td>
                  <td className="px-4 py-3">${priceOption.price}</td>
                  <td className="px-4 py-3">{programName(priceOption.program_id)}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => startEdit(priceOption)} className="text-green-800 font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(priceOption)} className="text-red-600 font-semibold">
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

export default AdminPriceOptions
