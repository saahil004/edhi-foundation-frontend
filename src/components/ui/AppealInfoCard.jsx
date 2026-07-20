import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const AppealInfoCard = ({ slug, title, desc, image }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex h-full max-w-xs flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-950/70 to-green-950/50" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <h3
        className={`mt-3 border-b pb-4 text-center text-lg font-semibold transition-colors duration-300 ${
          isHovered ? 'border-white/30 text-white' : 'border-gray-100 text-green-950'
        }`}
      >
        {title}
      </h3>

      <p
        className={`relative z-10 mt-4 flex-1 text-center text-sm leading-relaxed transition-colors duration-300 ${
          isHovered ? 'text-gray-100' : 'text-gray-600'
        }`}
      >
        {desc}
      </p>

      <Link
        to={`/appeals/${slug}`}
        className={`relative z-10 mx-auto mt-6 inline-flex w-fit items-center gap-2 border-t pt-4 text-sm font-semibold transition-colors duration-300 ${
          isHovered ? 'border-white/30 text-white' : 'border-gray-100 text-green-950'
        }`}
      >
        Learn More
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

export default AppealInfoCard