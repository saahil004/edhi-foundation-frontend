import { motion } from 'framer-motion'
import { founder } from '../../data/founderData.js'

const FounderProfile = () => {
  const { image, name, title, quote, bio } = founder

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg h-80 md:h-[420px] order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600" /> THE FOUNDER
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">{name}</h2>
          <p className="text-green-700 font-medium mb-5">{title}</p>

          <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-700 text-lg mb-6">
            "{quote}"
          </blockquote>

          {bio.map((para, i) => (
            <p key={i} className="text-gray-600 mb-4 leading-relaxed">
              {para}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FounderProfile