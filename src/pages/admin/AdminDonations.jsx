import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import DonationDetailsModal from '../../components/ui/DonationDetailsModal.jsx'

const statusOptions = ['', 'pending', 'completed', 'failed', 'refunded']

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
}

const looksLikeEmail = (value) => /^\S+@\S+\.\S+$/.test(value.trim())

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—')

const AdminDonations = () => {
  const [donations, setDonations] = useState([])
  const [meta, setMeta] = useState(null)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [userId, setUserId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [programId, setProgramId] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [services, setServices] = useState([])
  const [programs, setPrograms] = useState([])

  const [donorActivity, setDonorActivity] = useState(null)
  const [donorActivityLoading, setDonorActivityLoading] = useState(false)

  const [selectedDonation, setSelectedDonation] = useState(null)

  // Free-text search fires a request on every keystroke otherwise — debounce
  // it so admins typing a name/email don't hammer the endpoint mid-word.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQ(q), 400)
    return () => clearTimeout(timeout)
  }, [q])

  useEffect(() => {
    apiFetch('/admin/services').then((res) => setServices(res.data)).catch(() => {})
    apiFetch('/admin/programs').then((res) => setPrograms(res.data)).catch(() => {})
  }, [])

  const programOptions = useMemo(
    () => (serviceId ? programs.filter((p) => String(p.service_id) === String(serviceId)) : programs),
    [programs, serviceId]
  )

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const query = new URLSearchParams({
          page: String(page),
          ...(status ? { status } : {}),
          ...(debouncedQ ? { q: debouncedQ } : {}),
          ...(userId ? { user_id: userId } : {}),
          ...(serviceId ? { service_id: serviceId } : {}),
          ...(programId ? { program_id: programId } : {}),
        })
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
  }, [status, debouncedQ, userId, serviceId, programId, page])

  // Surfaces a donor's lifetime activity whenever the search narrows to one
  // specific donor — by User ID (registered) or by typing their exact email
  // (guests have no ID at all, so email is the only stable identifier).
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const lookup = userId
        ? { user_id: userId }
        : looksLikeEmail(debouncedQ)
          ? { email: debouncedQ.trim() }
          : null

      if (!lookup) {
        setDonorActivity(null)
        return
      }

      setDonorActivityLoading(true)
      try {
        const res = await apiFetch(`/admin/donations/donor-activity?${new URLSearchParams(lookup)}`)
        if (!cancelled) setDonorActivity(res)
      } catch {
        if (!cancelled) setDonorActivity(null)
      } finally {
        if (!cancelled) setDonorActivityLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [userId, debouncedQ])

  const hasActiveFilters = status || q || userId || serviceId || programId

  const clearFilters = () => {
    setStatus('')
    setQ('')
    setDebouncedQ('')
    setUserId('')
    setServiceId('')
    setProgramId('')
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Every one-time and recurring donation, guest or registered.</p>

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
            placeholder="Search by donor name, email, or payment reference..."
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm bg-white focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input
            type="number"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value)
              setPage(1)
            }}
            placeholder="User ID"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-400"
          />

          <select
            value={serviceId}
            onChange={(e) => {
              setServiceId(e.target.value)
              setProgramId('')
              setPage(1)
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="">All services</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.title}</option>
            ))}
          </select>

          <select
            value={programId}
            onChange={(e) => {
              setProgramId(e.target.value)
              setPage(1)
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="">All programs</option>
            {programOptions.map((program) => (
              <option key={program.id} value={program.id}>{program.name}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option ? option[0].toUpperCase() + option.slice(1) : 'All statuses'}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {donorActivityLoading ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 text-sm text-gray-500">
          Loading donor activity...
        </div>
      ) : donorActivity && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Donor Activity</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Donations', value: donorActivity.total_donations },
              { label: 'Total Given', value: `$${donorActivity.total_amount.toFixed(2)}` },
              { label: 'Average Donation', value: `$${donorActivity.average_donation.toFixed(2)}` },
              { label: 'First Donation', value: formatDate(donorActivity.first_donation_date) },
              { label: 'Latest Donation', value: formatDate(donorActivity.latest_donation_date) },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : donations.length === 0 ? (
          <p className="p-6 text-gray-500">No donations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Program</th>
                  <th className="px-4 py-3 whitespace-nowrap">Donor</th>
                  <th className="px-4 py-3 whitespace-nowrap">Type</th>
                  <th className="px-4 py-3 whitespace-nowrap">Amount</th>
                  <th className="px-4 py-3 whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{donation.program?.name ?? '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {donation.donor_name ?? '—'}
                        {donation.donor_gender && (
                          <span className="ml-1.5 text-[11px] font-normal text-gray-400 capitalize">
                            ({donation.donor_gender})
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500 text-xs">{donation.donor_email}</div>
                      <span
                        className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          donation.user_id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {donation.user_id ? `Registered (#${donation.user_id})` : 'Guest'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          donation.subscription_id ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {donation.subscription_id ? 'Recurring' : 'One-time'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">${donation.amount}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                          statusColors[donation.status] ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(donation.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        View
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

      <DonationDetailsModal donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
    </div>
  )
}

export default AdminDonations
