import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import servicesBannerImage from '../../assets/images/services-banner.jpg'
import BannerHeading from '../ui/BannerHeading.jsx'

const ServicesBanner = () => {
  return (
    <section className="relative w-full h-[26rem] md:h-[30rem] overflow-hidden">
      <motion.img
        src={servicesBannerImage}
        alt="Our services"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Dark green tint overlay */}
      <div className="absolute inset-0 bg-green-950/60" />

      {/* Decorative dot */}
      <span className="absolute top-[58%] left-1/2 -translate-x-24 w-2.5 h-2.5 rounded-full bg-yellow-400" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <BannerHeading delay={0.4}>Our Services</BannerHeading>

        <motion.div
          className="flex items-center gap-2 text-white/90 font-medium mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
        >
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Services</span>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesBanner