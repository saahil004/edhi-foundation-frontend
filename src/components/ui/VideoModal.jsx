import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const VideoModal = ({ video, onClose }) => {
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            <video src={video.src} controls autoPlay className="w-full rounded-2xl" />

            <div className="mt-4 text-center text-white">
              <h3 className="text-lg font-bold">{video.name}</h3>
              <p className="text-sm text-gray-300">{video.role}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VideoModal