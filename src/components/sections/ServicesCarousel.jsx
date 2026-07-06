import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { services } from '../../data/servicesData.js'
import ServiceCard from '../ui/ServiceCards.jsx'

const ServicesCarousel = () => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 320 // roughly one card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      })
    }
  }

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

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="lg:flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {services.map((service) => (
            <div key={service.id} className="min-w-70 snap-start my-5">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesCarousel