import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const MissionCard = ({ icon: Icon, title, description, point, image }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl bg-gray-50 p-6"
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
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-green-950/70" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* decorative blob - fades out on hover so it doesn't clash with the image */}
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gray-200/60 transition-opacity duration-300"
           style={{ opacity: isHovered ? 0 : 1 }} />

      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-green-800">
        <Icon className="h-5 w-5 text-white" />
      </div>

      <h3 className={`relative z-10 mt-4 text-lg font-semibold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>

      <p className={`relative z-10 mt-3 text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-gray-100' : 'text-gray-600'}`}>
        {description}
      </p>

      <div className={`relative z-10 mt-4 border-t pt-4 flex items-start gap-2 transition-colors duration-300 ${isHovered ? 'border-white/30' : 'border-gray-200'}`}>
        <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${isHovered ? 'text-white' : 'text-green-800'}`} />
        <p className={`text-sm transition-colors duration-300 ${isHovered ? 'text-gray-100' : 'text-gray-600'}`}>
          {point}
        </p>
      </div>
    </motion.div>
  )
}

export default MissionCard