import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { ArrowUpRight, LayoutDashboard } from 'lucide-react'
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
    <section className="relative overflow-hidden bg-green-950 px-6 py-20 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        {/* left: image collage */}
        <div className="relative grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              className="rounded-2xl bg-white p-4 shadow-lg"
            >
              <p className="text-lg font-bold text-green-950">
                {whatWeDoStats.volunteers.count}{' '}
                <span className="font-medium text-gray-600">
                  {whatWeDoStats.volunteers.label}
                </span>
              </p>
              <div className="mt-3 flex -space-x-2">
                {whatWeDoStats.volunteers.avatars.map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
            </motion.div>

            <motion.img
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              src={whatWeDoImages.volunteers}
              alt="Edhi volunteers"
              className="h-64 w-full rounded-2xl object-cover"
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-400">
                <LayoutDashboard className="h-5 w-5 text-green-950" />
              </div>
              <div>
                <p className="text-lg font-bold text-green-950">
                  {whatWeDoStats.projects.count}
                </p>
                <p className="text-sm text-gray-600">{whatWeDoStats.projects.label}</p>
              </div>
            </motion.div>
          </div>

          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
            src={whatWeDoImages.march}
            alt="Edhi field team"
            className="mt-10 h-[420px] w-full rounded-2xl object-cover"
          />
        </div>

        {/* right: Our Impact content */}
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

          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            Creating Change That <br /> Truly Matters
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
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-400 px-5 py-2.5 font-medium text-green-950 transition hover:bg-green-300"
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