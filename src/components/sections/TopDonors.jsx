import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import topDonors, { totalDonorsCount } from '../../data/topDonorsData'
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

const TopDonors = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-lg">
          {/* Left: donor list on green background */}
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
                <h3 className="text-xl font-bold">Top Donors</h3>
              </div>
              <a href="#" className="flex items-center gap-1 text-sm font-medium hover:underline">
                View all <ArrowRight size={14} />
              </a>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {topDonors.map((donor, index) => (
                <motion.li
                  key={donor.id}
                  variants={rowVariants}
                  className={`flex items-center justify-between py-4 ${
                    index < topDonors.length - 1 ? 'border-b border-white/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full bg-white text-green-800 font-bold text-sm flex items-center justify-center shrink-0">
                      {donor.id}
                    </span>
                    <span className="font-medium">{donor.name}</span>
                  </div>
                  <span className="font-bold">${donor.amount.toLocaleString()}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-8">
              <p className="text-4xl font-extrabold">{totalDonorsCount.toLocaleString()}+</p>
              <p className="text-sm font-semibold tracking-wide uppercase text-green-100 mt-1">
                Amazing Donors
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

export default TopDonors