import { motion } from 'framer-motion'
import contactBanner from '../../data/contactBannerData.js'
import DonateButton from '../ui/Button.jsx'
import BannerHeading from '../ui/BannerHeading.jsx'

const ContactBanner = () => {
  const { image, heading, subtext } = contactBanner

  return (
    <section
  className="relative h-[24rem] w-full overflow-hidden bg-fixed bg-cover bg-center md:h-[28rem]"
  style={{ backgroundImage: `url(${image})` }}
>
      {/* gradient overlay instead of flat black - keeps some photo detail visible */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center md:w-3/5 md:items-start md:px-16 md:text-left lg:px-20">
        <BannerHeading align="responsive" delay={0.35}>{heading}</BannerHeading>

        <motion.p
          className="mt-5 max-w-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
          className="mt-7"
        >
          <DonateButton />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactBanner