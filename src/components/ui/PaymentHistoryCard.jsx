import { motion } from 'framer-motion'
import { Calendar, Hash, Heart, RefreshCw } from 'lucide-react'

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
}

const REST_SHADOW = '0 8px 24px -8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)'
const HOVER_SHADOW = '0 24px 36px -14px rgba(6,78,59,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'

const cardVariants = {
  hidden: { opacity: 0, y: 24, boxShadow: REST_SHADOW },
  visible: {
    opacity: 1,
    y: 0,
    boxShadow: REST_SHADOW,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: HOVER_SHADOW,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

const PaymentHistoryCard = ({ payment, onClick }) => {
  const isRecurring = Boolean(payment.subscription_id)
  const date = new Date(payment.payment_date ?? payment.created_at)
  const image = payment.program?.image

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
      className="group relative overflow-hidden bg-gradient-to-br from-white/90 via-slate-100/60 to-slate-300/40 backdrop-blur-xl border border-white ring-1 ring-black/10 rounded-3xl p-6 md:p-7 cursor-pointer"
    >
      {/* Glass sheen — a soft highlight near the top edge plus a diagonal
          glare streak, like light catching the surface of glass. Purely
          structural (grays only), no color of its own. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent z-0" />
      <div className="pointer-events-none absolute -inset-x-4 -top-1/2 h-full rotate-12 bg-gradient-to-b from-white/40 via-white/0 to-transparent z-0" />

      {/* Shown always on mobile (no hover state to reveal it there); hidden
          until hover from md up — the image belongs to the service/appeal
          the donated program lives under (see ProgramResource::parentImage).
          Absent for programs whose parent has no image, in which case the
          card just keeps its plain glass look. */}
      {image && (
        <div className="absolute inset-0 z-0 opacity-100 md:opacity-0 scale-100 md:group-hover:opacity-100 md:group-hover:scale-110 transition-all duration-500 ease-out">
          <img src={image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 md:group-hover:scale-110 ${
                isRecurring
                  ? 'bg-white/20 md:bg-blue-50 md:group-hover:bg-white/20'
                  : 'bg-white/20 md:bg-green-50 md:group-hover:bg-white/20'
              }`}
            >
              {isRecurring ? (
                <RefreshCw
                  className="text-white md:text-blue-700 md:group-hover:text-white transition-colors duration-300"
                  size={18}
                />
              ) : (
                <Heart
                  className="text-white md:text-green-800 md:group-hover:text-white transition-colors duration-300"
                  size={18}
                  fill="currentColor"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white md:text-gray-900 md:group-hover:text-white truncate transition-colors duration-300">
                {payment.program?.name ?? 'General Fund'}
              </p>
              <span
                className={`inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isRecurring ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}
              >
                {isRecurring ? 'Recurring' : 'One-time'}
              </span>
            </div>
          </div>

          <span
            className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${
              statusStyles[payment.status] ?? 'bg-gray-100 text-gray-600'
            }`}
          >
            {payment.status}
          </span>
        </div>

        <p className="mt-7 text-3xl font-bold text-white md:text-gray-900 md:group-hover:text-white transition-colors duration-300">
          ${Number(payment.amount).toFixed(2)}{' '}
          <span className="text-sm font-medium text-white/70 md:text-gray-400 md:group-hover:text-white/70 transition-colors duration-300">
            USD
          </span>
        </p>

        <div className="mt-5 pt-4 border-t border-white/20 md:border-gray-200 md:group-hover:border-white/20 flex items-center gap-4 text-xs text-white/70 md:text-gray-500 md:group-hover:text-white/70 transition-colors duration-300">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            {date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Hash size={13} className="shrink-0" />
            <span className="font-mono truncate">{payment.payment_reference}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentHistoryCard
