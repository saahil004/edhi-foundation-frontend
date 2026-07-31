import { motion } from 'framer-motion'
import donationBanner from '../../data/donationBannerData.js'
import DonationIcon from '../../assets/icons/DonationIcon.jsx'
import BannerHeading from '../ui/BannerHeading.jsx'

const DonationBanner = () => {
  const { image, heading, subtext } = donationBanner

  return (
    <section className="relative w-full h-[24rem] md:h-[28rem] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: 'fixed',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="mb-4"
        >
          <DonationIcon />
        </motion.div>

        <BannerHeading delay={0.45}>{heading}</BannerHeading>

        <motion.p
          className="text-gray-200 max-w-xl mt-5"
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
