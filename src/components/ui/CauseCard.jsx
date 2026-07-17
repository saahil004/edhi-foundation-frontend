import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const CauseCard = ({ icon: Icon, title, description, image, id }) => {
  const [isHovered, setIsHovered] = useState(false)
  const isEven = id % 2 === 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex h-56 w-full flex-col overflow-hidden rounded-2xl bg-gray-50 p-6"
    >
      {/* hover background image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
            <div className={`absolute inset-0 ${isEven ? 'bg-red-950/70' : 'bg-green-950/70'}`} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          isHovered ? (isEven ? 'bg-red-700' : 'bg-green-700') : 'bg-green-800'
        }`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      <h3
        className={`relative z-10 mt-4 border-b pb-4 text-lg font-semibold transition-colors duration-300 ${
          isHovered ? 'border-white/30 text-white' : 'border-gray-200 text-gray-900'
        }`}
      >
        {title}
      </h3>

      <p
        className={`relative z-10 mt-4 line-clamp-3 text-sm leading-relaxed transition-colors duration-300 ${
          isHovered ? 'text-gray-100' : 'text-gray-600'
        }`}
      >
        {description}
      </p>
    </motion.div>
  )
}

export default CauseCard