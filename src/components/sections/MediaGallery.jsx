import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { galleryImages } from '../../data/mediaData.js'

const MediaGallery = () => {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.children[0]
    const cardWidth = card ? card.offsetWidth + 24 : 360
    scrollRef.current.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth, children } = scrollRef.current
    const card = children[0]
    if (!card) return
    const cardWidth = card.offsetWidth + 24
    const maxScroll = scrollWidth - clientWidth
    const maxIndex = galleryImages.length - 1

    if (scrollLeft >= maxScroll - 5) {
      setActiveIndex(maxIndex)
      return
    }
    setActiveIndex(Math.min(Math.round(scrollLeft / cardWidth), maxIndex))
  }

  const goToIndex = (index) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.children[0]
    const cardWidth = card ? card.offsetWidth + 24 : 360
    scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600" /> GALLERY
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Moments From Our Work</h2>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll gallery left"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll gallery right"
              className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {galleryImages.map((item, i) => (
            <motion.div
              key={item.caption}
              className="group relative snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[calc(33.333%-16px)] h-[320px] overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: 'easeOut' }}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-green-950/0 to-transparent" />
              <p className="absolute bottom-4 left-5 font-semibold text-white">{item.caption}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {galleryImages.map((item, i) => (
            <button
              key={item.caption}
              onClick={() => goToIndex(i)}
              aria-label={`Go to gallery image ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                activeIndex === i ? 'bg-red-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MediaGallery
