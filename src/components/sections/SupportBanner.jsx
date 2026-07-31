import { motion } from 'framer-motion'
import BannerHeading from '../ui/BannerHeading.jsx'
import bannerImage from '../../assets/images/support.PNG'

const SupportBanner = () => (
  <section className="relative w-full h-[24rem] md:h-[28rem] overflow-hidden">
    <motion.div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})`, backgroundAttachment: 'fixed' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />

    <div className="absolute inset-0 bg-black/50" />

    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <BannerHeading>Support & Policies</BannerHeading>
      <motion.p
        className="text-gray-200 max-w-xl mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
      >
        Everything you need to know about donating, volunteering, and how we handle your information.
      </motion.p>
    </div>
  </section>
)

export default SupportBanner
