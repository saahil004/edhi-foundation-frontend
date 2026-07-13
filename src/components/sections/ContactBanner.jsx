import { motion } from 'framer-motion'
import contactBanner from '../../data/contactBannerData.js'
import DonateButton from '../ui/Button.jsx'

const ContactBanner = () => {
  const { image, heading, subtext } = contactBanner

  return (
    <section className="relative w-full h-[26rem] md:h-[30rem] overflow-hidden">
      <motion.img
        src={image}
        alt="Edhi Foundation contact"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:items-start md:text-left md:w-1/2 md:px-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          {heading}
        </motion.h1>

        <motion.p
          className="text-gray-200 max-w-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
        >
          <DonateButton />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactBanner