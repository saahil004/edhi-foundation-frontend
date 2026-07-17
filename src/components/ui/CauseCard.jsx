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
      className="group relative flex h-56 w-full flex-col overflow-hidden rounded-2xl bg-gray-50 p-6"
    >
      {/* Mobile/Tablet: image always visible, zooms on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden lg:hidden">
        <img
          src={image}
          alt=""
          className="h-full w-full scale-100 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 ${
            isEven ? 'bg-red-950/70' : 'bg-green-950/70'
          }`}
        />
      </div>

      {/* Desktop: image appears on hover */}
      <div className="absolute inset-0 z-0 hidden overflow-hidden lg:block">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  isEven ? 'bg-red-950/70' : 'bg-green-950/70'
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          isHovered ? (isEven ? 'bg-red-700' : 'bg-green-700') : 'bg-green-800'
        }`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      <h3 className="relative z-10 mt-4 border-b pb-4 text-lg font-semibold text-white transition-colors duration-300 lg:border-gray-200 lg:text-gray-900 lg:group-hover:border-white/30 lg:group-hover:text-white">
        {title}
      </h3>

      <p className="relative z-10 mt-4 line-clamp-3 text-sm leading-relaxed text-gray-100 transition-colors duration-300 lg:text-gray-600 lg:group-hover:text-gray-100">
        {description}
      </p>
    </motion.div>
  )
}

export default CauseCard