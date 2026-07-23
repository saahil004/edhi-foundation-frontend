import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { mediaVideos } from '../../data/mediaVideosData'
import VideoModal from '../ui/VideoModal'

const total = mediaVideos.length

// Shortest signed distance around the circular list, so wrapping from the
// last item back to the first (or vice versa) slides one step to the
// adjacent side instead of spinning all the way around.
const circularOffset = (i, activeIndex) => {
  let offset = i - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

const ACTIVE_WIDTH = 320
const HEIGHT_RATIO = 1.06
const SHRINK_PER_STEP = 42
const MIN_WIDTH = 110
const X_STEP = 160

const VideoFeedback = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState(null)
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(1200)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width)
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // How many cards fit on each side of the active one before running past
  // the container's edge — this is what makes the carousel pack edge-to-edge
  // and reveal more cards on wide screens instead of leaving blank space.
  const maxOffset = Math.max(
    1,
    Math.min(Math.floor((total - 1) / 2), Math.round(containerWidth / 2 / X_STEP))
  )

  const goTo = (index) => setActiveIndex(((index % total) + total) % total)

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) goTo(activeIndex + 1)
    else if (info.offset.x > 60) goTo(activeIndex - 1)
  }

  // Lets mouse-wheel/trackpad scrolling (horizontal or vertical — trackpads
  // commonly send two-finger swipes as deltaY) step through the carousel,
  // not just drag/arrows/dots. A native listener (not React's onWheel) is
  // used so preventDefault actually works — React attaches wheel handlers
  // as passive by default. Cooldown prevents one continuous scroll gesture
  // from firing many index changes at once, and re-attaching on activeIndex
  // change keeps the closure's index current.
  const wheelCooldown = useRef(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 15 || wheelCooldown.current) return
      e.preventDefault()
      wheelCooldown.current = true
      goTo(activeIndex + (delta > 0 ? 1 : -1))
      setTimeout(() => {
        wheelCooldown.current = false
      }, 450)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [activeIndex])

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto mb-10 max-w-4xl text-center font-serif text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-4xl xl:text-5xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Watch Our Work in Action
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="mx-auto mt-5 block h-[3px] w-20 origin-center rounded-full bg-red-600 sm:w-24"
          />
        </motion.h2>
      </div>

      <div className="w-full px-6 lg:px-12 xl:px-20 2xl:px-32">
        <div
          ref={containerRef}
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            height: ACTIVE_WIDTH * HEIGHT_RATIO + 60,
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <button
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous video"
            className="absolute left-4 z-50 hidden h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md transition-colors hover:bg-gray-100 lg:flex"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next video"
            className="absolute right-4 z-50 hidden h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-colors hover:bg-red-700 lg:flex"
          >
            <ArrowRight size={18} />
          </button>
          <motion.div
            className="relative flex h-full w-full items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {mediaVideos.map((video, i) => {
              const offset = circularOffset(i, activeIndex)
              const isActive = offset === 0
              const abs = Math.abs(offset)
              const width = Math.max(MIN_WIDTH, ACTIVE_WIDTH - abs * SHRINK_PER_STEP)
              const height = width * HEIGHT_RATIO

              return (
                <motion.div
                  key={video.id}
                  className="absolute cursor-pointer select-none"
                  style={{ zIndex: 100 - abs }}
                  animate={{
                    x: offset * X_STEP,
                    width,
                    height,
                    opacity: abs > maxOffset ? 0 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                  onClick={() => (isActive ? setActiveVideo(video) : goTo(i))}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      draggable={false}
                      className={`h-full w-full object-cover transition-all duration-300 ${
                        !isActive ? 'grayscale-[40%] brightness-75' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/85 via-green-950/10 to-transparent" />

                    {isActive && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 hover:scale-110">
                            <div className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-green-950" />
                          </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <h3 className="font-bold">{video.title}</h3>
                          <p className="text-sm text-gray-300">{video.source}</p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mt-8 flex items-center justify-center gap-2">
          {mediaVideos.map((video, i) => (
            <button
              key={video.id}
              onClick={() => goTo(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-8 bg-red-600' : 'w-2.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  )
}

export default VideoFeedback
