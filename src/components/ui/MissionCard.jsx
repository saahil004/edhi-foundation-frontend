import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const MissionCard = ({ icon: Icon, title, description, point, image, id }) => {
  const [isHovered, setIsHovered] = useState(false)
  const isEven = id % 2 === 0

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-gray-50 p-6"
    >
      {/* mobile/tablet: image always visible, zooms on hover, hidden at lg */}
      <div className="absolute inset-0 z-0 overflow-hidden lg:hidden">
        <img
          src={image}
          alt=""
          className="h-full w-full scale-100 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className={`absolute inset-0 ${isEven ? 'bg-red-950/70' : 'bg-green-950/70'}`} />
      </div>

      {/* desktop: image hidden by default, reveals + zooms on hover */}
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
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className={`absolute inset-0 ${isEven ? 'bg-red-950/70' : 'bg-green-950/70'}`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* decorative blob - fades out on hover, desktop only anyway since it'd be covered on mobile */}
      <div
        className="absolute -top-4 -right-4 hidden h-24 w-24 rounded-full bg-gray-200/60 transition-opacity duration-300 lg:block"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      <div
        className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${
          isEven ? 'bg-red-800' : 'bg-green-800'
        }`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      <h3 className="relative z-10 mt-4 text-lg font-semibold text-white transition-colors duration-300 lg:text-gray-900 lg:group-hover:text-white">
        {title}
      </h3>

      <p className="relative z-10 mt-3 text-sm leading-relaxed text-gray-100 transition-colors duration-300 lg:text-gray-600 lg:group-hover:text-gray-100">
        {description}
      </p>

      <div className="relative z-10 mt-4 flex items-start gap-2 border-t border-white/30 pt-4 transition-colors duration-300 lg:border-gray-200 lg:group-hover:border-white/30">
        <CheckCircle2
          className={`h-4 w-4 mt-0.5 shrink-0 text-white lg:text-gray-900 ${
            isEven ? 'lg:group-hover:text-white' : 'lg:group-hover:text-white'
          } ${isEven ? 'lg:text-red-800' : 'lg:text-green-800'}`}
        />
        <p className="text-sm text-gray-100 transition-colors duration-300 lg:text-gray-600 lg:group-hover:text-gray-100">
          {point}
        </p>
      </div>
    </motion.div>
  )
}

export default MissionCard