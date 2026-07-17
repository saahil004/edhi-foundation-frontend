import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  HeartPulse,
  Baby,
  Home,
  BookOpen,
  Ambulance,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const iconMap = {
  hospital: HeartPulse,
  child: Baby,
  home: Home,
  book: BookOpen,
  ambulance: Ambulance,
}

const ServiceInfoCard = ({ slug, title, desc, image, icon }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = iconMap[icon] ?? HeartPulse

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm"
    >
      {/* hover image - slides up from bottom */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-green-950/60" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          isHovered ? 'bg-white' : 'bg-green-600'
        }`}
      >
        <Icon
          className={`h-6 w-6 transition-colors duration-300 ${
            isHovered ? 'text-green-950' : 'text-green-950'
          }`}
        />
      </div>

      <h3
        className={`mt-5 border-b pb-4 text-lg font-semibold transition-colors duration-300 ${
          isHovered ? 'border-white/30 text-white' : 'border-gray-100 text-green-950'
        }`}
      >
        {title}
      </h3>

      <p
        className={`relative z-10 mt-4 flex-1 text-sm leading-relaxed transition-colors duration-300 ${
          isHovered ? 'text-gray-100' : 'text-gray-600'
        }`}
      >
        {desc}
      </p>

      <Link
        to={`/services/${slug}`}
        className={`relative z-10 mt-6 inline-flex w-fit items-center gap-2 border-t pt-4 text-sm font-semibold transition-colors duration-300 ${
          isHovered ? 'border-white/30 text-white' : 'border-gray-100 text-green-950'
        }`}
      >
        Read More
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

export default ServiceInfoCard