import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import BannerHeading from '../ui/BannerHeading.jsx'

const ServiceHero = ({ image, title, desc, Icon }) => {
  return (
    <section className="relative w-full h-[26rem] md:h-[32rem] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, backgroundAttachment: 'fixed' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-7xl mx-auto left-0 right-0">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-6 w-fit"
        >
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="flex items-center gap-4">
          {Icon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="w-14 h-14 rounded-full bg-green-800 flex items-center justify-center shrink-0"
            >
              <Icon className="text-white" size={26} />
            </motion.div>
          )}
          <BannerHeading align="left" delay={0.3}>{title}</BannerHeading>
        </div>

        <motion.p
          className="text-gray-200 max-w-2xl text-sm md:text-base mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        >
          {desc}
        </motion.p>
      </div>
    </section>
  )
}

export default ServiceHero