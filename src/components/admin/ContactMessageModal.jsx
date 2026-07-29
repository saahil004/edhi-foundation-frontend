import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Mail, Phone, X } from 'lucide-react'

const statusColors = {
  new: 'bg-yellow-100 text-yellow-800',
  handled: 'bg-green-100 text-green-800',
}

const ContactMessageModal = ({ message, onClose, onToggleStatus, updating }) => {
  return (
    <AnimatePresence>
      {message && (
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
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-start justify-between gap-4 mb-4 pr-8">
              <div>
                <p className="font-bold text-gray-900 text-lg">{message.first_name} {message.last_name}</p>
                <div className="flex flex-col gap-1 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-2"><Mail size={14} /> {message.email}</span>
                  <span className="flex items-center gap-2"><Phone size={14} /> {message.phone}</span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} /> {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${
                  statusColors[message.status] ?? 'bg-gray-100 text-gray-600'
                }`}
              >
                {message.status}
              </span>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap break-words">
              {message.message || <span className="text-gray-400 italic">No message</span>}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={`mailto:${message.email}`}
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail size={16} /> Email
              </a>
              <a
                href={`tel:${message.phone}`}
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Phone size={16} /> Call
              </a>
            </div>

            <button
              onClick={() => onToggleStatus(message)}
              disabled={updating}
              className="mt-3 w-full bg-green-800 hover:bg-green-900 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {message.status === 'new' ? 'Mark as handled' : 'Mark as new'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactMessageModal
