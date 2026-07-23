import { motion } from 'framer-motion'

/**
 * Shared heading treatment for every full-bleed page banner (About, Appeal,
 * Contact, Donation, Media, Service list/detail) so they read as one
 * consistent design system instead of each having drifted its own size,
 * weight, and animation over time.
 */
// 'center' and 'left' apply at all sizes; 'responsive' centers on mobile and
// switches to left-aligned from md up (for banners whose surrounding layout
// splits the same way, e.g. ContactBanner).
const alignClasses = {
  center: { wrapper: 'items-center text-center', origin: 'center' },
  left: { wrapper: 'items-start text-left', origin: 'left' },
  responsive: { wrapper: 'items-center text-center md:items-start md:text-left', origin: 'center' },
}

const BannerHeading = ({ children, dark = false, align = 'center', delay = 0.35 }) => {
  const { wrapper, origin } = alignClasses[align] ?? alignClasses.center

  return (
    <div className={`flex flex-col ${wrapper}`}>
      <motion.h1
        className={`text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl ${
          dark ? 'text-green-950' : 'text-white drop-shadow-sm'
        }`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.h1>

      <motion.span
        className={`mt-4 h-1 w-20 rounded-full bg-red-600 ${align === 'responsive' ? 'md:origin-left' : ''}`}
        style={align === 'responsive' ? undefined : { transformOrigin: origin }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.25, ease: 'easeOut' }}
      />
    </div>
  )
}

export default BannerHeading
