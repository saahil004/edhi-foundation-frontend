import { motion } from 'framer-motion'

const ServiceAbout = ({ desc }) => {
  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-600" /> ABOUT THIS SERVICE
      </span>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Help</h2>
      <p className="text-gray-600 leading-relaxed mb-4">{desc}</p>
      <p className="text-gray-600 leading-relaxed">
        Every donation to this program goes directly toward sustaining and expanding this service —
        helping the Edhi Foundation continue its work of serving humanity without discrimination, exactly
        as Abdul Sattar Edhi envisioned.
      </p>
    </motion.div>
  )
}

export default ServiceAbout