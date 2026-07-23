import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../../data/galleryData'

const VISIBLE_COUNT = 3

const EventGallery = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [activeThumb, setActiveThumb] = useState(0)

  const maxStart = Math.max(0, galleryImages.length - VISIBLE_COUNT)

  const visibleImages = galleryImages.slice(startIndex, startIndex + VISIBLE_COUNT)

  const goPrev = () => setStartIndex((prev) => Math.max(0, prev - 1))
  const goNext = () => setStartIndex((prev) => Math.min(maxStart, prev + 1))

  const handleThumbClick = (index) => {
    setActiveThumb(index)
    // keep the main view centered around the clicked thumbnail where possible
    const newStart = Math.min(maxStart, Math.max(0, index - 1))
    setStartIndex(newStart)
  }

  return (
    <section className="hidden px-6 py-16 lg:block lg:px-20">
      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
        Event Glimpses
      </h2>

      {/* main display */}
      <div className="relative">
        <button
          onClick={goPrev}
          disabled={startIndex === 0}
          className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80 disabled:opacity-30"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {visibleImages.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-[320px] overflow-hidden rounded-2xl border-4 border-green-600"
            >
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={startIndex >= maxStart}
          className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80 disabled:opacity-30"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* thumbnail strip */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 justify-center">
        {galleryImages.map((img, index) => (
          <button
            key={img.id}
            onClick={() => handleThumbClick(index)}
            className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              activeThumb === index
                ? 'border-gray-900 opacity-100'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}

export default EventGallery