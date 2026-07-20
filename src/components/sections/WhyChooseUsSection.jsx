import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { whyChooseUsContent } from '../../data/whyChooseUsData.js'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const WhyChooseUsSection = () => {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        {/* left: content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-800" />
            {whyChooseUsContent.badge}
          </span>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-green-950 md:text-5xl">
            {whyChooseUsContent.heading}
          </h2>

          <p className="mt-5 max-w-md text-gray-600">
            {whyChooseUsContent.description}
          </p>

          <motion.div
            className="mt-8 flex flex-col gap-5 rounded-2xl bg-gray-50 p-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {whyChooseUsContent.points.map((point) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={point.id}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="group flex items-center gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">{point.text}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <Link
  to="/contact"
  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
>
  Learn More
  <ArrowUpRight className="h-4 w-4" />
</Link>
          </div>
        </motion.div>

        {/* right: overlapping images + call us card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto h-[520px] w-full max-w-md"
        >
          {/* main image */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group absolute right-0 top-0 h-[420px] w-[300px] overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src={whyChooseUsContent.images.main}
              alt="Edhi Foundation march"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </motion.div>

          {/* call us card
          <motion.div
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-6 top-14 z-20 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600">
              <Phone className="h-5 w-5 text-green-950" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-green-950">
                {whyChooseUsContent.callUs.label}
              </p>
              <p className="text-sm text-gray-600">
                {whyChooseUsContent.callUs.number}
              </p>
            </div>
          </motion.div> */}

          {/* overlapping image - bottom left, overlaps main image */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group absolute bottom-0 left-0 z-10 h-[220px] w-[220px] overflow-hidden rounded-2xl border-4 border-white shadow-xl"
          >
            <img
              src={whyChooseUsContent.images.overlap}
              alt="World Population Day march"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection