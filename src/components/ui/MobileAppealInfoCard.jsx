import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const MobileAppealInfoCard = ({ slug, title, desc, image }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative h-full w-full"
    >
      <div className="relative h-72 overflow-hidden rounded-2xl bg-green-950 sm:h-80">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
          <div className="mb-4 border-t border-white/30 pt-3">
            <p className="line-clamp-2 text-sm text-gray-100">{desc}</p>
          </div>
          <Link
            to={`/appeals/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-all hover:gap-3"
          >
            Learn More <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default MobileAppealInfoCard