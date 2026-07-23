import { useState } from 'react'
import { motion } from 'framer-motion'
import { mediaVideos } from '../../data/mediaVideosData'
import VideoCard from '../ui/VideoCard'
import VideoModal from '../ui/VideoModal'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const VideoFeedback = () => {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center text-4xl font-bold text-green-950 md:text-5xl"
      >
        Voices from the Field
      </motion.h2>

      <motion.div
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {mediaVideos.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={setActiveVideo} />
        ))}
      </motion.div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  )
}

export default VideoFeedback