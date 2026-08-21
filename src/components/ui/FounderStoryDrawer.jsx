import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const FounderStoryDrawer = ({ member, onClose }) => {
  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/50"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 right-0 h-full w-full max-w-lg bg-white shadow-xl overflow-y-auto"
          >
            <div className="relative h-64 shrink-0">
              <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-950/10 to-transparent" />

              <button
                onClick={onClose}
                aria-label="Close founder story"
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-sm font-medium text-gray-200">{member.title}</span>
                <h2 className="text-2xl font-bold text-white">{member.name}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {member.fullStory?.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FounderStoryDrawer
