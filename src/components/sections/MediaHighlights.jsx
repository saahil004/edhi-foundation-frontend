import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { mediaSections } from '../../data/mediaData.js'

const MediaHighlightRow = ({ item, index }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // image drifts slightly as the row scrolls through the viewport
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-0 lg:grid-cols-2 ${
        item.reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative h-[280px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[420px]"
      >
        <motion.img
          src={item.image}
          alt={item.title}
          style={{ y }}
          className="h-[130%] w-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className={`relative -mt-10 rounded-2xl bg-white p-8 shadow-xl lg:-mt-0 ${
          item.reverse ? 'lg:-mr-10' : 'lg:-ml-10'
        } mx-4 lg:mx-0`}
      >
        <span
          className="mb-2 block text-6xl font-black opacity-10"
          style={{ color: item.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold"
          style={{ color: item.accent, borderColor: item.accent }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
          {item.title}
        </span>

        <p className="leading-relaxed text-gray-600">{item.description}</p>
      </motion.div>
    </div>
  )
}

const MediaHighlights = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-16 md:space-y-10 md:py-20">
        {mediaSections.map((item, index) => (
          <MediaHighlightRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

export default MediaHighlights