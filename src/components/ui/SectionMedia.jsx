import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const VISIBLE_COUNT = 3
const SWIPE_THRESHOLD = 50

const SectionMedia = ({ item }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], [-30, 30])

    const gallery = item.gallery ?? []
    const [lightboxImage, setLightboxImage] = useState(null)
    const [expanded, setExpanded] = useState(false)

    // desktop scroll gallery
    const scrollRef = useRef(null)
    const [scrollIndex, setScrollIndex] = useState(0)

    const getCardStep = () => {
        const container = scrollRef.current
        if (!container || !container.firstElementChild) return 0
        const card = container.firstElementChild
        const style = window.getComputedStyle(container)
        const gap = parseFloat(style.columnGap || style.gap || 0)
        return card.offsetWidth + gap
    }

    const scrollToIndex = (i) => {
        const container = scrollRef.current
        if (!container) return
        container.scrollTo({ left: getCardStep() * i, behavior: 'smooth' })
    }

    const scrollByAmount = (direction) => {
        const container = scrollRef.current
        if (!container) return
        container.scrollBy({ left: getCardStep() * direction, behavior: 'smooth' })
    }

    const handleScroll = () => {
        const container = scrollRef.current
        if (!container) return
        const step = getCardStep()
        if (step === 0) return
        setScrollIndex(Math.round(container.scrollLeft / step))
    }

    // mobile coverflow state
    const [activeIndex, setActiveIndex] = useState(Math.floor(gallery.length / 2))
    const goTo = (i) => setActiveIndex(Math.max(0, Math.min(gallery.length - 1, i)))
    const handleDragEnd = (event, info) => {
        if (info.offset.x < -SWIPE_THRESHOLD) goTo(activeIndex + 1)
        else if (info.offset.x > SWIPE_THRESHOLD) goTo(activeIndex - 1)
    }

    return (
        <div ref={ref} className="space-y-8">
            {/* section heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative mx-auto max-w-4xl text-center font-serif text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-4xl xl:text-5xl"
                style={{ letterSpacing: '-0.03em' }}
            >
                {item.title}
                <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                    className="mx-auto mt-5 block h-[3px] w-20 origin-center rounded-full sm:w-24"
                    style={{ backgroundColor: item.accent }}
                />
            </motion.h2>

            {/* content row */}
            <div
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
                        className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold"
                        style={{ color: item.accent, borderColor: item.accent }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
                        {item.title}
                    </span>

                    <p className={`leading-relaxed text-gray-600 ${expanded ? '' : 'line-clamp-5'}`}>
                        {item.description}
                    </p>

                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="mt-3 text-sm font-semibold transition-opacity hover:opacity-70"
                        style={{ color: item.accent }}
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                </motion.div>
            </div>

            {/* desktop gallery */}
            {gallery.length > 0 && (
                <div className="hidden lg:block">
                    <div className="relative">
                        <button
                            onClick={() => scrollByAmount(-1)}
                            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    onClick={() => setLightboxImage(img)}
                                    className="h-[220px] w-[calc(33.333%-11px)] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border-2 transition-opacity hover:opacity-90"
                                    style={{ borderColor: item.accent }}
                                >
                                    <img src={img} alt="" className="h-full w-full object-cover" />
                                </motion.div>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollByAmount(1)}
                            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80"
                            aria-label="Next"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* desktop pagination dots */}
                    {gallery.length > VISIBLE_COUNT && (
                        <div className="mt-5 flex items-center justify-center gap-2">
                            {Array.from({ length: gallery.length - VISIBLE_COUNT + 1 }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToIndex(i)}
                                    className={`h-2 rounded-full transition-all ${
                                        scrollIndex === i ? 'w-6' : 'w-2 bg-gray-300'
                                    }`}
                                    style={scrollIndex === i ? { backgroundColor: item.accent } : undefined}
                                    aria-label={`Go to image ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* mobile coverflow gallery */}
            {gallery.length > 0 && (
                <div className="lg:hidden">
                    <div className="relative h-[320px] w-full overflow-hidden" style={{ perspective: '1200px' }}>
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            className="relative flex h-full items-center justify-center"
                        >
                            {gallery.map((img, i) => {
                                const offset = i - activeIndex
                                if (Math.abs(offset) > 2) return null
                                const isActive = offset === 0

                                return (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            x: offset * 110,
                                            rotateY: offset * -35,
                                            scale: isActive ? 1 : 0.75,
                                            opacity: 1 - Math.abs(offset) * 0.25,
                                            zIndex: 10 - Math.abs(offset),
                                        }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                        onClick={() => (isActive ? setLightboxImage(img) : goTo(i))}
                                        className="absolute h-[260px] w-[190px] shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <img src={img} alt="" className="h-full w-full object-cover" draggable={false} />
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2">
                        {gallery.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2 rounded-full transition-all ${
                                    activeIndex === i ? 'w-6' : 'w-2 bg-gray-300'
                                }`}
                                style={activeIndex === i ? { backgroundColor: item.accent } : undefined}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        onClick={() => setLightboxImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[85vh] max-w-3xl"
                        >
                            <button
                                onClick={() => setLightboxImage(null)}
                                className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                            <img
                                src={lightboxImage}
                                alt=""
                                className="max-h-[85vh] w-auto rounded-2xl object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SectionMedia