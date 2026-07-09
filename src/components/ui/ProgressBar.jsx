import { motion } from 'framer-motion'

const ProgressBar = ({ percent, color = 'bg-red-600' }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: '0%' }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

export default ProgressBar