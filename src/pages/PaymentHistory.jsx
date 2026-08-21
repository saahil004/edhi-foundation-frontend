import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HandHeart, Heart, Receipt } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { usePaymentHistory } from '../hooks/usePaymentHistory.js'
import PaymentHistoryCard from '../components/ui/PaymentHistoryCard.jsx'
import PaymentDetailsModal from '../components/ui/PaymentDetailsModal.jsx'
import { CountUpNumber } from '../components/ui/StatBadge.jsx'
import BannerHeading from '../components/ui/BannerHeading.jsx'
import InfiniteMarquee from '../components/ui/InfiniteMarquee.jsx'
import Seo from '../components/ui/Seo.jsx'
import bannerImage from '../assets/images/ph-banner.png'

const marqueeItems = [
  'Every Rupee Counts',
  'Thank You for Your Support',
  'Transparent Giving',
  'Serving Humanity Since 1951',
  'Your Generosity in Action',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const PaymentHistory = () => {
  const { user, loading: authLoading } = useAuth()
  const { payments, loading, error, page, setPage, lastPage, totalGiven, totalPayments } = usePaymentHistory()
  const [selectedPayment, setSelectedPayment] = useState(null)

  if (authLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="min-h-screen bg-white">
      <Seo title="Payment History" noindex />
      <section className="relative w-full h-[24rem] md:h-[28rem] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-scroll lg:bg-fixed"
          style={{ backgroundImage: `url(${bannerImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <BannerHeading>Payment History</BannerHeading>
          <motion.p
            className="text-gray-200 max-w-xl mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          >
            Every donation you've made, one-time and recurring.
          </motion.p>
        </div>
      </section>

      <div className="overflow-hidden">
        <InfiniteMarquee items={marqueeItems} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
        {/* Soft blurred backdrop shapes — with a plain white page there's
            nothing behind the cards' backdrop-blur to actually show through,
            so the glass effect reads as flat. These give it something. */}
        <div className="pointer-events-none absolute -top-10 -left-16 w-96 h-96 bg-gray-300/30 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-24 w-[28rem] h-[28rem] bg-gray-400/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-80 h-80 bg-gray-200/40 rounded-full blur-3xl" />

        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10">
          {!loading && payments.length > 0 && (
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-10 max-w-2xl md:max-w-md mx-auto">
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="aspect-square bg-white border border-gray-200 shadow-sm rounded-3xl flex flex-col items-center justify-center gap-2 md:gap-1.5 p-6 md:p-4 text-center"
              >
                <div className="w-14 h-14 md:w-11 md:h-11 rounded-full bg-green-800 flex items-center justify-center">
                  <Heart className="text-white" size={24} fill="white" />
                </div>
                <p className="text-3xl md:text-2xl font-bold text-gray-900">
                  $<CountUpNumber value={Math.round(totalGiven)} />
                </p>
                <p className="text-sm md:text-xs text-gray-500">total given</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="aspect-square bg-white border border-gray-200 shadow-sm rounded-3xl flex flex-col items-center justify-center gap-2 md:gap-1.5 p-6 md:p-4 text-center"
              >
                <div className="w-14 h-14 md:w-11 md:h-11 rounded-full bg-green-800 flex items-center justify-center">
                  <Receipt className="text-white" size={24} />
                </div>
                <p className="text-3xl md:text-2xl font-bold text-gray-900">
                  <CountUpNumber value={totalPayments} />
                </p>
                <p className="text-sm md:text-xs text-gray-500">total payments</p>
              </motion.div>
            </motion.div>
          )}

          {error && (
            <motion.div
              variants={itemVariants}
              className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
            >
              {error.message}
            </motion.div>
          )}

          {loading ? (
            <motion.p variants={itemVariants} className="text-gray-500">Loading...</motion.p>
          ) : payments.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <HandHeart className="text-gray-400" size={28} />
                </div>
              </div>
              <p className="text-gray-500">You haven't made any donations yet.</p>
            </motion.div>
          ) : (
            <>
              <motion.div variants={containerVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {payments.map((payment) => (
                  <PaymentHistoryCard
                    key={payment.id}
                    payment={payment}
                    onClick={() => setSelectedPayment(payment)}
                  />
                ))}
              </motion.div>

              {lastPage > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from({ length: lastPage }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      aria-current={n === page ? 'page' : undefined}
                      className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                        n === page ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <PaymentDetailsModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
    </main>
  )
}

export default PaymentHistory
