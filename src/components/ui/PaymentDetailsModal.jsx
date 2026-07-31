import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Download, Hash, Heart, Mail, Phone, RefreshCw, User, X } from 'lucide-react'
import { generateInvoicePdf } from '../../utils/generateInvoicePdf.js'

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
}

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <span className="flex items-center gap-2 text-sm text-gray-500">
      <Icon size={15} />
      {label}
    </span>
    <span className="text-sm font-semibold text-gray-900 text-right truncate max-w-[60%]">{value}</span>
  </div>
)

const PaymentDetailsModal = ({ payment, onClose }) => {
  const isRecurring = Boolean(payment?.subscription_id)
  const date = payment ? new Date(payment.payment_date ?? payment.created_at) : null

  const handleDownload = () => {
    generateInvoicePdf({
      donorName: payment.donor_name,
      donorEmail: payment.donor_email,
      amount: payment.amount,
      frequency: isRecurring ? 'Recurring' : 'single',
      programName: payment.program?.name,
      reference: payment.payment_reference,
      date,
    })
  }

  return (
    <AnimatePresence>
      {payment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
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
                <p className="font-bold text-gray-900 leading-tight">{payment.program?.name ?? 'General Fund'}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isRecurring ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {isRecurring ? 'Recurring' : 'One-time'}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                      statusStyles[payment.status] ?? 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-6">
              ${Number(payment.amount).toFixed(2)} <span className="text-base font-medium text-gray-400">USD</span>
            </p>

            <div>
              <DetailRow
                icon={Calendar}
                label="Date"
                value={date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              />
              <DetailRow icon={User} label="Donor" value={payment.donor_name ?? '—'} />
              <DetailRow icon={Mail} label="Email" value={payment.donor_email ?? '—'} />
              <DetailRow icon={Phone} label="Phone" value={payment.donor_phone ?? '—'} />
              <DetailRow icon={Hash} label="Reference" value={payment.payment_reference} />
            </div>

            {payment.status === 'completed' && (
              <button
                onClick={handleDownload}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-md transition-colors"
              >
                <Download size={16} />
                Download Invoice
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PaymentDetailsModal
