import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Hash, Heart, Mail, MapPin, Phone, RefreshCw, User, X } from 'lucide-react'

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
}

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 gap-4">
    <span className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
      <Icon size={15} />
      {label}
    </span>
    <span className="text-sm font-semibold text-gray-900 text-right break-words">{value}</span>
  </div>
)

const DonationDetailsModal = ({ donation, onClose }) => {
  const isRecurring = Boolean(donation?.subscription_id)
  const date = donation ? new Date(donation.payment_date ?? donation.created_at) : null

  const address = donation
    ? [donation.donor_address, donation.donor_city, donation.donor_province].filter(Boolean).join(', ')
    : ''

  return (
    <AnimatePresence>
      {donation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 md:px-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div
                className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isRecurring ? 'bg-blue-50' : 'bg-green-50'
                }`}
              >
                {isRecurring ? (
                  <RefreshCw className="text-blue-700" size={20} />
                ) : (
                  <Heart className="text-green-800" size={20} fill="#065f46" />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight">{donation.program?.name ?? 'General Fund'}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isRecurring ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {isRecurring ? 'Recurring' : 'One-time'}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                      statusStyles[donation.status] ?? 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {donation.status}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      donation.user_id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {donation.user_id ? `Registered (#${donation.user_id})` : 'Guest'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-6">
              ${Number(donation.amount).toFixed(2)} <span className="text-base font-medium text-gray-400">USD</span>
            </p>

            <div>
              <DetailRow icon={Hash} label="Donation ID" value={`#${donation.id}`} />
              <DetailRow icon={Hash} label="Invoice / Reference" value={donation.payment_reference ?? '—'} />
              <DetailRow
                icon={Calendar}
                label="Date"
                value={date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              />
              <DetailRow icon={User} label="Donor" value={donation.donor_name ?? '—'} />
              <DetailRow icon={Mail} label="Email" value={donation.donor_email ?? '—'} />
              <DetailRow icon={Phone} label="Phone" value={donation.donor_phone ?? '—'} />
              <DetailRow icon={MapPin} label="Address" value={address || '—'} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DonationDetailsModal
