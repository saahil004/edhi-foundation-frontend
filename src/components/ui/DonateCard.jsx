import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const DonateCard = ({ title, donateTo = '/donation' }) => {
  return (
    <motion.div
      className="bg-gray-50 rounded-2xl p-6 md:p-8 h-fit sticky top-24"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
    >
      <h3 className="font-bold text-gray-900 mb-2">Support This Appeal</h3>
      <p className="text-sm text-gray-500 mb-6">
        Every contribution to {title} goes directly toward those who need it most.
      </p>
      <Link
        to={donateTo}
        className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-full transition-colors"
      >
        Donate Now <Heart size={16} />
      </Link>
    </motion.div>
  )
}

export default DonateCard