import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight as ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { honours } from '../../data/honoursData.js'

const Honours = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Dots represent scroll "pages", not individual cards — on wide screens
    // several cards are visible at once, so a dot per card would leave most
    // of them doing nothing when clicked.
    const updatePageCount = () => {
      const { scrollWidth, clientWidth } = container
      const overflow = scrollWidth - clientWidth
      // Desktop only overflows by about one card's width (~23%), which
      // Math.round was collapsing back down to 1 page and hiding the dots
      // entirely — ceil so any real overflow still counts as a 2nd page.
      setPageCount(overflow > 8 && clientWidth > 0 ? Math.ceil(scrollWidth / clientWidth) : 1)
    }

    updatePageCount()
    window.addEventListener('resize', updatePageCount)
    return () => window.removeEventListener('resize', updatePageCount)
  }, [])

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const maxScroll = container.scrollWidth - container.clientWidth
    if (maxScroll <= 0) return
    const progress = container.scrollLeft / maxScroll
    setActiveIndex(Math.round(progress * (pageCount - 1)))
  }

  const goToPage = (index) => {
    const container = scrollRef.current
    if (!container) return
    const maxScroll = container.scrollWidth - container.clientWidth
    const target = pageCount > 1 ? (maxScroll * index) / (pageCount - 1) : 0
    container.scrollTo({ left: target, behavior: 'smooth' })
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
          Honours for Our <span className="text-green-800">Humanitarian Efforts</span>
        </h1>
        <p className="text-gray-500">
          A testament to our unwavering commitment to serving humanity, these awards recognize the
          impact and dedication of our mission to uplift lives and spread compassion.
        </p>
      </motion.div>

      <div
  ref={scrollRef}
  onScroll={handleScroll}
  className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide pt-10 pb-4"
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
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover"
    />
  </div>

  <h3 className="font-bold text-gray-900 mb-1">{award.title}</h3>
  <p className="text-sm text-gray-500">{award.year}</p>
</motion.div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={activeIndex === i}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-6 bg-green-700' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          About Us <ArrowRightIcon size={18} />
        </Link>
      </div>
    </section>
  )
}

export default Honours