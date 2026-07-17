import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { ArrowUpRight, LayoutDashboard, CheckCircle2, Users } from 'lucide-react'
import {
  whatWeDoStats,
  whatWeDoImages,
} from '../../data/whatWeDoData'
import { stats } from '../../data/statsData.js'
import { Link } from 'react-router-dom'

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const CountUpNumber = ({ value }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, value])

  return <span ref={ref}>{display.toLocaleString()}</span>
}

const WhatWeDoSection = () => {
  const visibleStats = stats.slice(0, 2)

  return (
    <section className="relative bg-green-950 px-6 py-20 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        {/* left: image collage - centered within its column */}
        <div className="relative mx-auto flex w-full max-w-2xl items-center justify-center">
          <div className="relative grid w-full grid-cols-[3fr_2fr] gap-4">
            {/* left column */}
            <div className="relative flex flex-col gap-4 w-full">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
                className="relative"
              >
                <div className="group relative h-80 w-full overflow-hidden rounded-2xl">
                  <motion.img
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={imageVariants}
                    src={whatWeDoImages.volunteers}
                    alt="Edhi volunteers"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </div>

                {/* volunteers card - square, overlaid top-left */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="group/card absolute left-0 top-0 flex h-35 w-35 flex-col items-center justify-center gap-2 rounded-2xl border-4 border-green-950 bg-white p-4 text-center shadow-lg hover:shadow-2xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-800 transition-colors duration-300 group-hover/card:bg-red-700">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xl font-bold text-green-950">
                    <CountUpNumber value={whatWeDoStats.volunteers.value} />
                    {whatWeDoStats.volunteers.suffix}
                  </p>
                  <p className="text-xs font-medium text-gray-600">
                    {whatWeDoStats.volunteers.label}
                  </p>
                  <div className="flex -space-x-2">
                    {whatWeDoStats.volunteers.avatars.map((avatar, i) => (
                      <img
                        key={i}
                        src={avatar}
                        alt=""
                        className="h-6 w-6 rounded-full border-2 border-white object-cover transition-transform duration-200 hover:z-10 hover:scale-110"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* projects card - original spot, mobile/tablet only, hidden at lg */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={imageVariants}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="group/card absolute -bottom-32 left-2 z-20 flex items-center gap-3 rounded-2xl bg-white px-5 py-8 shadow-xl hover:shadow-2xl lg:hidden"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-800 transition-colors duration-300 group-hover/card:bg-red-700">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-green-950">
                      <CountUpNumber value={whatWeDoStats.projects.value} />
                      {whatWeDoStats.projects.suffix}
                    </p>
                    <p className="text-xs font-medium text-gray-600">
                      {whatWeDoStats.projects.label}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* right: march image, overlapping left column - always visible */}
            <div className="group absolute right-15 top-45 z-10 h-[280px] w-[280px] overflow-hidden rounded-2xl border-9 border-green-950 shadow-xl">
              <motion.img
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
                src={whatWeDoImages.march}
                alt="Edhi rally"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

              {/* projects card - lg only, bottom-right of march image */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group/card absolute -bottom-0 -right-0 z-20 hidden h-35 w-35 flex-col items-center justify-center gap-2 rounded-2xl border-4 border-green-950 bg-white p-3 text-center shadow-xl hover:shadow-2xl lg:flex"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-800 transition-colors duration-300 group-hover/card:bg-red-700">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <p className="text-xl font-bold text-green-950">
                  <CountUpNumber value={whatWeDoStats.projects.value} />
                  {whatWeDoStats.projects.suffix}
                </p>
                <p className="text-xs font-medium text-gray-600">
                  {whatWeDoStats.projects.label}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* right: Our Impact content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="my-20 lg:my-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm text-gray-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Our Impact
          </span>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
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
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="rounded-2xl bg-white/10 p-6"
              >
                <h3 className="text-4xl font-extrabold tracking-tight text-white tabular-nums">
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