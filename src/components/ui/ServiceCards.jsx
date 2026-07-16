import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar'
import { Link } from 'react-router-dom'

const ServiceCard = ({ title, desc, image, raised, goal, delay = 0 }) => {
  const percent = Math.round((raised / goal) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="h-full rounded-xl overflow-hidden border border-gray-100 bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={400}
        height={224}
        className="w-full h-40 object-cover shrink-0"
      />

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{desc}</p>

        <ProgressBar percent={percent} color="bg-green-600" />
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2 mb-4">
          <span>Donation {percent}%</span>
          <span>Raised: ${raised.toLocaleString()}</span>
        </div>

        <Link to='/donation'>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            More Info
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}

export default ServiceCard