import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, ShoppingCart } from 'lucide-react'
import { iconMap } from '../../data/servicesData.js'

const MobileServiceInfoCard = ({ slug, title, desc, image, icon }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = iconMap[icon]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full h-full"
    >
      {/* Mobile/tablet: full-bleed photo card */}
      <div className="lg:hidden relative rounded-2xl overflow-hidden h-72 sm:h-80">
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Icon badge, top-left */}
        <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-md">
          {Icon && <Icon className="h-6 w-6 text-white" />}
        </div>


        {/* Text content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <div className="border-t border-white/30 pt-3 mb-4">
            <p className="text-sm text-gray-100 line-clamp-2">{desc}</p>
          </div>
          <Link
            to={`/services/${slug}`}
            className="inline-flex items-center gap-2 bg-green-800 text-white font-semibold text-sm rounded-full px-4 py-2 hover:gap-3 transition-all"
          >
            Read More <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      
    </motion.div>
  )
}

export default MobileServiceInfoCard