import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { honours } from '../../data/honoursData.js'

const Honours = () => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = 280
    scrollRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Honours for Our <span className="text-green-600">Humanitarian Efforts</span>
        </h1>
        <p className="text-gray-500">
          A testament to our unwavering commitment to serving humanity, these awards recognize the
          impact and dedication of our mission to uplift lives and spread compassion.
        </p>
      </motion.div>

      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={() => scroll('left')}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors"
          aria-label="Scroll right"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div
  ref={scrollRef}
  className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pt-10"
>
        {honours.map((award, i) => (
          <motion.div
  key={award.id}
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
  className="snap-start shrink-0 w-[70%] sm:w-[45%] lg:w-[23%] relative bg-gray-50 rounded-2xl pt-14 pb-6 px-6 flex flex-col items-center text-center"
>
  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border-4 border-white">
    <img
      src={award.image}
      alt={award.title}
      className="w-full h-full object-cover"
    />
  </div>

  <h3 className="font-bold text-gray-900 mb-1">{award.title}</h3>
  <p className="text-sm text-gray-500">{award.year}</p>
</motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Learn More About Us <ArrowRightIcon size={18} />
        </Link>
      </div>
    </section>
  )
}

export default Honours