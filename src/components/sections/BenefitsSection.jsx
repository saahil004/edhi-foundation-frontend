// components/sections/BenefitsSection.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CircleDollarSign, CheckCircle2, Phone } from 'lucide-react'
import benefits from '../../data/benefitsData.js'
import StatBadge, { CountUpNumber } from '../ui/StatBadge'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const BenefitsSection = () => {
  const { eyebrow, heading, description, buttonLabel, buttonLink, stat, image, impactCard, closingText, closingLinkLabel, closingLinkPath, closingAvatar } = benefits

  return (
    <section className="relative bg-green-950 px-6 py-20 md:px-12 lg:px-20 overflow-hidden">
      <span className="absolute top-6 left-6 w-2.5 h-2.5 rounded-full bg-red-600" />

      {/* Header row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" /> {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-tight">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="lg:pt-2"
        >
          <p className="text-gray-300 mb-5">{description}</p>
          <Link
            to={buttonLink}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            {buttonLabel} <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Three-column cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Stat card */}
        <motion.div variants={cardVariants} className="bg-white/5 rounded-2xl p-6 flex flex-col">
          <p className="text-4xl font-extrabold text-white tabular-nums">
            <CountUpNumber value={stat.value} />
            <span className="text-yellow-400">{stat.suffix}</span>
          </p>

          <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center my-5">
            <CircleDollarSign className="text-white" size={22} />
          </div>

          <h3 className="font-bold text-white mb-2">{stat.label}</h3>
          <div className="border-t border-white/10 pt-3 mt-auto">
            <p className="text-sm text-gray-300">{stat.description}</p>
          </div>
        </motion.div>

        {/* Image card */}
        <motion.div variants={cardVariants} className="rounded-2xl overflow-hidden min-h-[320px]">
          <img src={image} alt="Community program" className="w-full h-full object-cover" />
        </motion.div>

        {/* Impact card */}
        <motion.div variants={cardVariants} className="bg-white/5 rounded-2xl p-6 flex flex-col">
          <div className="flex -space-x-4 mb-5">
            {impactCard.collageImages.map((img, i) => (
              <div key={i} className="w-16 h-16 rounded-full overflow-hidden border-4 border-green-950">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <h3 className="font-bold text-white mb-2">{impactCard.title}</h3>
          <div className="border-t border-white/10 pt-3 mb-4">
            <p className="text-sm text-gray-300">{impactCard.description}</p>
          </div>

          <ul className="space-y-2 mt-auto">
            {impactCard.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                <CheckCircle2 size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Closing line */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="flex items-center justify-center gap-3 mt-10 text-sm text-gray-300"
      >
        <div className="flex items-center -space-x-2">
          <img src={closingAvatar} alt="" className="w-7 h-7 rounded-full border-2 border-green-950 object-cover" />
          <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-green-950 flex items-center justify-center">
            <Phone size={12} className="text-white" />
          </div>
        </div>
        <p>
          {closingText}{' '}
          <Link to={closingLinkPath} className="text-white font-semibold underline hover:text-yellow-400 transition-colors">
            {closingLinkLabel}
          </Link>
        </p>
      </motion.div>
    </section>
  )
}

export default BenefitsSection