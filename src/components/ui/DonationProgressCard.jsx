import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'

const DonationProgressCard = ({ raised, goal, donateTo = '/donation' }) => {
  const percent = Math.round((raised / goal) * 100)

  return (
    <motion.div
      className="bg-gray-50 rounded-2xl p-6 md:p-8 h-fit sticky top-24"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
    >
      <h3 className="font-bold text-gray-900 mb-4">Program Progress</h3>

      <ProgressBar percent={percent} color="bg-green-600" />
      <div className="flex items-center justify-between text-sm text-gray-500 mt-2 mb-6">
        <span>{percent}% funded</span>
        <span>Goal: ${goal.toLocaleString()}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-2xl font-bold text-gray-900">${raised.toLocaleString()}</p>
          <p className="text-xs text-gray-500">raised so far</p>
        </div>
      </div>

      <Link
        to={donateTo}
        className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-full transition-colors"
      >
        Donate to This Program <Heart size={16} />
      </Link>
    </motion.div>
  )
}

export default DonationProgressCard