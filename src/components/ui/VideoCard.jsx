import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const VideoCard = ({ video, onSelect }) => {
  return (
    <motion.div variants={cardVariants}>
      <button
        onClick={() => onSelect(video)}
        className="group block w-full overflow-hidden rounded-2xl text-left"
      >
        <div className="relative h-52 overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={video.poster}
            alt={video.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/30">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform duration-300 group-hover:scale-110">
              <div className="ml-1 h-0 w-0 border-y-8 border-l-[14px] border-y-transparent border-l-green-950" />
            </div>
          </div>
        </div>

        <h3 className="mt-4 font-bold text-green-950">{video.name}</h3>
        <p className="text-sm text-gray-500">{video.role}</p>
      </button>
    </motion.div>
  )
}

export default VideoCard