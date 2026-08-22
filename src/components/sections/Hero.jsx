import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hero } from '../../data/heroData'
import { Link } from 'react-router-dom'

const HeartHandIcon = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="8 10 44 44"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M32 18 C32 14 28 12 25 14 C22 16 22 21 32 29 C42 21 42 16 39 14 C36 12 32 14 32 18Z"/>
    <path d="M15 39 C18 35 24 35 28 38 L33 42 C35 43 35 46 33 47 C31 48 29 48 27 47 L23 45"/>
    <path d="M15 39 C12 42 12 48 18 50 L30 53 C35 54 40 53 44 50 L49 46"/>
    <path d="M11 49 L15 39"/>
  </svg>
)

const HeartHandsIcon = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="8 14 44 42"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M32 24 C32 18 26 15 22 18 C18 21 18 28 32 38 C46 28 46 21 42 18 C38 15 32 18 32 24Z"/>
    <path d="M12 39 C15 34 20 33 25 36 L29 39 C31 40 31 43 29 44 C27 45 25 45 23 44 L20 42"/>
    <path d="M12 39 C9 42 9 48 14 50 L25 54 C28 55 32 54 34 51"/>
    <path d="M52 39 C49 34 44 33 39 36 L35 39 C33 40 33 43 35 44 C37 45 39 45 41 44 L44 42"/>
    <path d="M52 39 C55 42 55 48 50 50 L39 54 C36 55 32 54 30 51"/>
  </svg>
)

// Shared entrance variants for staggered children
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const Hero = () => {
  return (
    <section className="w-full bg-white overflow-hidden h-fit">
      {/* Mobile/tablet */}
      <div className="lg:hidden">
        <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-96 md:h-[32rem] overflow-hidden">
          {/* CSS background (not <img>) — scroll attachment, not fixed:
              mobile browsers render fixed backgrounds through a blurrier
              compositing path than desktop, confirmed visibly blurry on a
              real iPhone. */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-scroll"
            style={{ backgroundImage: `url(${hero.mobileImageWebp})` }}
          />
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="absolute inset-0 flex flex-col justify-start p-6 sm:p-8"
          >
            <motion.div variants={item} className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <HeartHandsIcon className="text-green-700" style={{ width: 22, height: 22 }} />
            </motion.div>

            <motion.h1 variants={item} className="text-3xl sm:text-4xl font-bold text-white leading-tight max-w-[70%]">
              {hero.headingLine1} <br />
              {hero.headingLine2} <br />
              <span className="text-green-400">{hero.headingHighlight}</span>
            </motion.h1>

            <motion.svg variants={item} width="48" height="4" viewBox="0 0 48 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-4">
              <rect width="48" height="4" rx="2" fill="#16a34a" />
            </motion.svg>

            <motion.p variants={item} className="text-gray-200 mt-5 max-w-[65%] sm:max-w-xs font-medium text-balance">
              {hero.subtext}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="absolute bottom-6 right-6 flex flex-col sm:flex-row items-end sm:items-center gap-3"
          >
            <Link to='/donation' className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded transition-colors text-sm sm:text-base">
              Donate Now <HeartHandIcon style={{ width: 16, height: 16 }} />
            </Link>
            <Link to="/about#impact-stats" className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-5 py-2.5 rounded transition-colors text-sm sm:text-base">
              Our Impact <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Desktop / large screens: one full-bleed banner graphic (a photo
          collage with its own blank left panel) with the text overlaid on
          that blank panel. aspect-ratio is locked to the image's own native
          ratio so object-cover never has anything to crop — no size/position
          tuning needed, and none of the background-attachment quirks that
          affect the other banner sections apply here since this is a plain
          <img>, not a CSS background. This is the LCP element on desktop. */}
      <div className="hidden lg:block relative w-full" style={{ aspectRatio: hero.desktopImageRatio }}>
        <picture>
          <source srcSet={hero.desktopImageWebp} type="image/webp" />
          <img
            src={hero.desktopImage}
            alt="Children supported by Edhi Foundation"
            width={1983}
            height={793}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="absolute inset-y-0 left-0 flex w-[38%] flex-col justify-center pl-10 xl:pl-16 2xl:pl-20"
        >
          <motion.div variants={item} className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <HeartHandsIcon className="text-green-700" style={{ width: 22, height: 22 }} />
          </motion.div>

          <motion.h1 variants={item} className="text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
            {hero.headingLine1} <br />
            {hero.headingLine2} <br />
            <span className="text-green-600">{hero.headingHighlight}</span>
          </motion.h1>

          <motion.svg variants={item} width="48" height="4" viewBox="0 0 48 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-4">
            <rect width="48" height="4" rx="2" fill="#16a34a" />
          </motion.svg>

          <motion.p variants={item} className="text-gray-500 mt-5 max-w-md">
            {hero.subtext}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/donation" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors">
              Donate Now <HeartHandIcon style={{ width: 18, height: 18 }} />
            </Link>
            <Link to="/about#impact-stats" className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-6 py-3 rounded transition-colors">
              Our Impact <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
