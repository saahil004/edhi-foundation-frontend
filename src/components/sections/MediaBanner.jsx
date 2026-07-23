import { motion } from 'framer-motion'
import mediaBanner from '../../data/mediaBannerData.js'
import BannerHeading from '../ui/BannerHeading.jsx'

const MediaBanner = () => {
  const { image, heading, subtext } = mediaBanner

  return (
    <section className="relative w-full h-[24rem] md:h-[28rem] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, backgroundAttachment: 'fixed' }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <BannerHeading>{heading}</BannerHeading>
        <motion.p
          className="max-w-xl text-gray-200 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          {subtext}
        </motion.p>
      </div>
    </section>
  )
}

export default MediaBanner