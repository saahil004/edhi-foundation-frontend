import { motion } from 'framer-motion'
import donationBanner from '../../data/donationBannerData.js'
import DonationIcon from '../../assets/icons/DonationIcon.jsx'
import BannerHeading from '../ui/BannerHeading.jsx'

const DonationBanner = () => {
  const { image, heading, subtext } = donationBanner

  return (
    <section className="relative w-full h-72 md:h-96 overflow-hidden">
      {/* Background image */}
      <motion.img
        src={image}
        alt="Hands holding a heart"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Fade overlay: mobile darkens bottom for text legibility, desktop fades left-to-right */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-orange-50/60 md:to-orange-100" />

      {/* Mobile: text centered, pinned near bottom */}
      <div className="absolute inset-x-0 bottom-0 flex md:hidden flex-col items-center text-center py-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <DonationIcon />
        </motion.div>
        <BannerHeading delay={0.45}>{heading}</BannerHeading>
        <motion.p
          className="text-gray-200 text-sm mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
        >
          {subtext}
        </motion.p>
      </div>

      {/* Desktop: text block occupies right half, centered content */}
      <div className="absolute top-0 bottom-0 right-0 w-1/2 hidden md:flex flex-col justify-center items-center text-center py-8 px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <DonationIcon />
        </motion.div>
        <BannerHeading dark delay={0.45}>{heading}</BannerHeading>
        <motion.p
          className="text-gray-500 text-2xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
        >
          {subtext}
        </motion.p>
      </div>
    </section>
  )
}

export default DonationBanner