import { motion } from 'framer-motion'
import aboutBanner from '../../data/serviceBannerData.js'

const ServiceBanner = () => {
  const { image, heading, subtext } = aboutBanner

  return (
    <section className="relative w-full h-60 h-110 lg:h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: 'fixed',
        }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-green-50 mb-3 opacity-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          {heading}
        </motion.h1>
        <motion.p
          className="text-gray-200 max-w-xl opacity-45"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          {subtext}
        </motion.p>
      </div>
    </section>
  )
}

export default ServiceBanner