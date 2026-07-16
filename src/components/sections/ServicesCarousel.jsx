import { useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { services } from '../../data/servicesData.js'
import ServiceCard from '../ui/ServiceCards.jsx'

const CARDS_PER_VIEW_DESKTOP = 4

const ServicesCarousel = () => {
  const desktopScrollRef = useRef(null)
  const mobileScrollRef = useRef(null)
  const [activeCard, setActiveCard] = useState(0)
  const [activeDesktopPage, setActiveDesktopPage] = useState(0)

  const desktopPageCount = Math.ceil(services.length / CARDS_PER_VIEW_DESKTOP)

  const scrollDesktop = (direction) => {
    if (!desktopScrollRef.current) return
    const amount = 320
    desktopScrollRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  const handleDesktopScroll = () => {
    if (!desktopScrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = desktopScrollRef.current
    const maxScroll = scrollWidth - clientWidth
    const maxPage = desktopPageCount - 1

    if (scrollLeft >= maxScroll - 5) {
      setActiveDesktopPage(maxPage)
      return
    }

    const pageWidth = clientWidth
    const page = Math.round(scrollLeft / pageWidth)
    setActiveDesktopPage(Math.min(page, maxPage))
  }

  const goToDesktopPage = (page) => {
    if (!desktopScrollRef.current) return
    const { scrollWidth, clientWidth } = desktopScrollRef.current
    const maxScroll = scrollWidth - clientWidth
    const target = Math.min(page * clientWidth, maxScroll)
    desktopScrollRef.current.scrollTo({
      left: target,
      behavior: 'smooth',
    })
  }

  const scrollMobile = (direction) => {
    if (!mobileScrollRef.current) return
    const card = mobileScrollRef.current.children[0]
    const cardWidth = card ? card.offsetWidth + 16 : 300
    mobileScrollRef.current.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    })
  }

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth, children } = mobileScrollRef.current
    const card = children[0]
    if (!card) return
    const cardWidth = card.offsetWidth + 16

    const maxScroll = scrollWidth - clientWidth
    const maxIndex = services.length - 1

    if (scrollLeft >= maxScroll - 5) {
      setActiveCard(maxIndex)
      return
    }

    const index = Math.round(scrollLeft / cardWidth)
    setActiveCard(Math.min(index, maxIndex))
  }

  const goToCard = (index) => {
    if (!mobileScrollRef.current) return
    const card = mobileScrollRef.current.children[0]
    const cardWidth = card ? card.offsetWidth + 16 : 300
    const { scrollWidth, clientWidth } = mobileScrollRef.current
    const maxScroll = scrollWidth - clientWidth

    const target = Math.min(index * cardWidth, maxScroll)
    mobileScrollRef.current.scrollTo({
      left: target,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const mobileEl = mobileScrollRef.current
    const desktopEl = desktopScrollRef.current
    if (mobileEl) mobileEl.addEventListener('scroll', handleMobileScroll)
    if (desktopEl) desktopEl.addEventListener('scroll', handleDesktopScroll)
    return () => {
      if (mobileEl) mobileEl.removeEventListener('scroll', handleMobileScroll)
      if (desktopEl) desktopEl.removeEventListener('scroll', handleDesktopScroll)
    }
  }, [])

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600" /> OUR SERVICES
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              Services That Make <br />
              <span className="text-green-600">A Difference</span>
            </h2>
          </div>

          <div className="hidden lg:flex gap-3">
            <button
              onClick={() => scrollDesktop('left')}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollDesktop('right')}
              className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex lg:hidden gap-3">
            <button
              onClick={() => scrollMobile('left')}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollMobile('right')}
              className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop: horizontal row, 4 visible */}
        <div
          ref={desktopScrollRef}
          className="hidden lg:flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              className="snap-start shrink-0 w-[calc(25%-18px)]"
            >
              <ServiceCard {...service} delay={(i % 4) * 0.08} />
            </div>
          ))}
        </div>

        {/* Desktop dot pagination — one dot per group of 4 */}
        {desktopPageCount > 1 && (
          <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: desktopPageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToDesktopPage(i)}
                aria-label={`Go to services page ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeDesktopPage === i ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile/tablet: horizontal scroll, 2 cards visible at a time */}
        <div
          ref={mobileScrollRef}
          className="lg:hidden flex items-stretch gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              className="snap-start shrink-0 w-[calc(50%-8px)]"
            >
              <ServiceCard {...service} delay={(i % 4) * 0.08} />
            </div>
          ))}
        </div>

        {/* Mobile dot pagination — one dot per service */}
        {services.length > 1 && (
          <div className="flex lg:hidden items-center justify-center gap-2 mt-6">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => goToCard(i)}
                aria-label={`Go to service ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeCard === i ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesCarousel