import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../../data/galleryData'

const SWIPE_THRESHOLD = 50

const MobileEventGallery = () => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(galleryImages.length / 2))

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(galleryImages.length - 1, index))
    setActiveIndex(clamped)
  }

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      goTo(activeIndex + 1)
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      goTo(activeIndex - 1)
    }
  }

  return (
    <section className="px-6 py-16 lg:hidden">
      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800">
        Event Glimpses
      </h2>

      <div className="relative h-[380px] w-full overflow-hidden" style={{ perspective: '1200px' }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative flex h-full items-center justify-center"
        >
          {galleryImages.map((img, index) => {
            const offset = index - activeIndex
            if (Math.abs(offset) > 2) return null
            const isActive = offset === 0

            return (
              <motion.div
                key={img.id}
                animate={{
                  x: offset * 130,
                  rotateY: offset * -35,
                  scale: isActive ? 1 : 0.75,
                  opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.25,
                  zIndex: 10 - Math.abs(offset),
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => !isActive && goTo(index)}
                className="absolute h-[300px] w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" draggable={false} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* arrows + pagination dots */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-950 text-white transition-opacity disabled:opacity-30"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? 'w-6 bg-green-950' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === galleryImages.length - 1}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-950 text-white transition-opacity disabled:opacity-30"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default MobileEventGallery