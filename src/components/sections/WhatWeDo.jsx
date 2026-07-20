import { ArrowUpRight, CheckCircle2, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { whatWeDoStats, whatWeDoImages } from '../../data/whatWeDoData'
import { stats } from '../../data/statsData.js'
import { Link } from 'react-router-dom'
import StatBadge, { CountUpNumber } from '../ui/StatBadge'

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const WhatWeDoSection = () => {
  const visibleStats = stats.slice(0, 2)

  return (
    <section className="relative bg-green-950 px-6 py-20 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">

        {/* LEFT: image area */}
        <div className="relative mx-auto w-full max-w-2xl">

          {/* Mobile/tablet: simple stacked layout, no absolute collage */}
          <div className="lg:hidden space-y-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl"
            >
              <img src={whatWeDoImages.volunteers} alt="Edhi volunteers" className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              className="relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl"
            >
              <img src={whatWeDoImages.march} alt="Edhi rally" className="h-full w-full object-cover" />
            </motion.div>

            <div className="flex gap-4 justify-center pt-2">
              <StatBadge
                icon={Users}
                value={whatWeDoStats.volunteers.value}
                suffix={whatWeDoStats.volunteers.suffix}
                label={whatWeDoStats.volunteers.label}
                avatars={whatWeDoStats.volunteers.avatars}
              />
              <StatBadge
                icon={CheckCircle2}
                value={whatWeDoStats.projects.value}
                suffix={whatWeDoStats.projects.suffix}
                label={whatWeDoStats.projects.label}
              />
            </div>
          </div>

          {/* Desktop: two overlapping images + two corner badges */}
          <div className="hidden lg:block relative w-full max-w-xl mx-auto" style={{ height: '560px' }}>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              className="group absolute top-24 left-0 w-[75%] h-[420px] overflow-hidden rounded-2xl z-10"
            >
              <img src={whatWeDoImages.volunteers} alt="Edhi volunteers" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              className="group absolute bottom-0 right-0 w-[55%] h-[300px] overflow-hidden rounded-2xl border-8 border-green-950 shadow-xl z-20"
            >
              <img src={whatWeDoImages.march} alt="Edhi rally" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </motion.div>

            
          </div>
        </div>

        {/* RIGHT: Our Impact content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm text-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Our Impact
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight text-white md:text-5xl">
            Creating Change That Truly Matters
          </h2>

          <p className="mt-5 max-w-lg text-gray-300">
            Through dedicated programs, transparent processes, & long-term
            commitment, we ensure every effort leads to meaningful and
            lasting impact.
          </p>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {visibleStats.map((stat) => (
              <motion.div key={stat.id} variants={itemVariants} className="rounded-2xl bg-white/10 p-6">
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums">
                  <CountUpNumber value={stat.value} />
                  <span className="text-green-400">{stat.suffix}</span>
                </h3>
                <h4 className="mt-4 font-semibold text-white">{stat.label}</h4>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-sm text-gray-300">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-5 py-2.5 font-medium text-white transition"
          >
            Contact Us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatWeDoSection