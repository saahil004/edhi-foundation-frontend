import { useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { services } from '../../data/servicesData.js'
import ServiceCard from '../ui/ServiceCards.jsx'

const CARDS_PER_PAGE = 4

const chunk = (arr, size) => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const ServicesCarousel = () => {
  const desktopScrollRef = useRef(null)
  const mobileScrollRef = useRef(null)
  const [activePage, setActivePage] = useState(0)

  const pages = chunk(services, CARDS_PER_PAGE)

  const scrollDesktop = (direction) => {
    if (!desktopScrollRef.current) return
    const amount = 320
    desktopScrollRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  const scrollMobile = (direction) => {
    if (!mobileScrollRef.current) return
    const width = mobileScrollRef.current.clientWidth
    mobileScrollRef.current.scrollBy({
      left: direction === 'right' ? width : -width,
      behavior: 'smooth',
    })
  }

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const { scrollLeft, clientWidth } = mobileScrollRef.current
    const page = Math.round(scrollLeft / clientWidth)
    setActivePage(page)
  }

  const goToPage = (page) => {
    if (!mobileScrollRef.current) return
    mobileScrollRef.current.scrollTo({
      left: page * mobileScrollRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const el = mobileScrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleMobileScroll)
    return () => el.removeEventListener('scroll', handleMobileScroll)
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

          {/* Desktop arrows */}
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

          {/* Mobile/tablet arrows */}
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
              <ServiceCard {...service} delay={(i % CARDS_PER_PAGE) * 0.08} />
            </div>
          ))}
        </div>

        {/* Mobile/tablet: horizontal pages, each page a vertical stack of 4 cards */}
        <div
          ref={mobileScrollRef}
          className="lg:hidden flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {pages.map((pageServices, pageIndex) => (
            <div
              key={pageIndex}
              className="snap-start shrink-0 w-full flex flex-col gap-4"
            >
              {pageServices.map((service, i) => (
                <ServiceCard key={service.id} {...service} delay={i * 0.08} />
              ))}
            </div>
          ))}
        </div>

        {/* Dot pagination — mobile/tablet only */}
        {pages.length > 1 && (
          <div className="flex lg:hidden items-center justify-center gap-2 mt-6">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activePage === i ? 'bg-red-600' : 'bg-gray-300'
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