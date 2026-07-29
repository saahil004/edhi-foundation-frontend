import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useTopDonations } from '../../hooks/useTopDonations.js'
import { useAuth } from '../../context/AuthContext.jsx'
import donationImpactImage from '../../assets/images/topdonors.PNG'

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const TopDonations = () => {
  const { topDonations, totalDonations, loading } = useTopDonations()
  const { user } = useAuth()

  if (loading || topDonations.length === 0) return null

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-lg">
          {/* Left: donation list on green background */}
          <motion.div
            className="bg-green-800 text-white p-8 md:p-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Heart size={24} />
                <h3 className="text-xl font-bold">Top Donations</h3>
              </div>
              <Link
                to={user ? '/payment-history' : '/login'}
                className="flex items-center gap-1 text-sm font-medium hover:underline"
              >
                View my donations <ArrowRight size={14} />
              </Link>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {topDonations.map((donation, index) => (
                <motion.li
                  key={`${index}`}
                  variants={rowVariants}
                  className={`flex items-center justify-between py-4 gap-4 ${
                    index < topDonations.length - 1 ? 'border-b border-white/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-white text-green-800 font-bold text-sm flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{donation.program ?? 'General Fund'}</p>
                      {donation.service && (
                        <p className="text-xs text-green-100 truncate">{donation.service}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold shrink-0">${donation.amount.toLocaleString()}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-8">
              <p className="text-4xl font-extrabold">{totalDonations.toLocaleString()}+</p>
              <p className="text-sm font-semibold tracking-wide uppercase text-green-100 mt-1">
                Donations Made
              </p>
            </div>
          </motion.div>

          {/* Right: image + heading — hidden on mobile/tablet */}
          <motion.div
            className="relative min-h-[320px] md:min-h-full hidden md:block"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <img
              src={donationImpactImage}
              alt="A simple donation, a lasting impact"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TopDonations
