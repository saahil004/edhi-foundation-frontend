import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { appeals } from '../../data/appealsData'
import ViewAllBanner from '../ui/ViewAllBanner'

const AppealsCarousel = () => {
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
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600" /> OUR APPEALS
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Donation Appeals</h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Your generosity can bring hope, restore dignity and change lives for the better.
            </p>
          </div>

          <div className="hidden lg:flex gap-3">
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

        {/* Scrollable card row — 3 on mobile/tablet, 4 on desktop */}
        <div
          ref={scrollRef}
          className="md:flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {appeals.map((appeal) => (
            <div
              key={appeal.id}
              className="snap-start shrink-0 w-full lg:w-[calc(25%-18px)] m-2 p-3"
            >
              <div className="relative rounded-xl overflow-hidden h-90 group">
                <img
                  src={appeal.image}
                  alt={appeal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5 text-white">
                  <h3 className="font-bold text-lg mb-1">{appeal.title}</h3>
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2">{appeal.desc}</p>
                  <button className="flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                    Donate Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all banner */}
        <ViewAllBanner
          text={
            <>
              Every act of kindness creates a <span className="font-semibold text-gray-900">ripple of hope</span>. Be the reason someone smiles today.
            </>
          }
          buttonLabel="View All Appeals"
          linkTo="/appeals"
        />
      </div>
    </section>
  )
}

export default AppealsCarousel