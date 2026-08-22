import { motion } from 'framer-motion'
import serviceBanner from '../../data/serviceBannerData.js'
import BannerHeading from '../ui/BannerHeading.jsx'

const ServiceBanner = () => {
  const { image, mobileImage, heading, subtext } = serviceBanner

  return (
    <section className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-96 md:h-[32rem] lg:h-[28rem] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-top bg-scroll lg:hidden"
          style={{ backgroundImage: `url(${mobileImage})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-scroll lg:bg-fixed hidden lg:block"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <BannerHeading>{heading}</BannerHeading>
        <motion.p
          className="text-gray-200 max-w-xl mt-5"
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

export default ServiceBanner
