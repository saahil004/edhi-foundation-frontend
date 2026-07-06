import { useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { appeals } from '../../data/appealsData'
import ViewAllBanner from '../ui/ViewAllBanner'
import { Link } from 'react-router-dom'

const CARDS_PER_PAGE = 4

const chunk = (arr, size) => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const AppealsCarousel = () => {
  const mobileScrollRef = useRef(null)
  const desktopScrollRef = useRef(null)
  const [activePage, setActivePage] = useState(0)

  const pages = chunk(appeals, CARDS_PER_PAGE)

  const scrollDesktop = (direction) => {
    if (!desktopScrollRef.current) return
    const amount = 320
    desktopScrollRef.current.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  const scrollMobile = (direction) => {
    if (!mobileScrollRef.current) return
    const width = mobileScrollRef.current.clientWidth
    mobileScrollRef.current.scrollBy({
      left: direction === 'next' ? width : -width,
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

          {/* Desktop arrows */}
          <div className="hidden lg:flex gap-3">
            <button
              onClick={() => scrollDesktop('prev')}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollDesktop('next')}
              className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Mobile/tablet arrows */}
          <div className="flex lg:hidden gap-3">
            <button
              onClick={() => scrollMobile('prev')}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollMobile('next')}
              className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop: horizontal row, 4 visible, side-overlay cards */}
        <div
          ref={desktopScrollRef}
          className="hidden lg:flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {appeals.map((appeal) => (
            <div
              key={appeal.id}
              className="relative snap-start shrink-0 h-90 w-[calc(25%-18px)] rounded-xl overflow-hidden group"
            >
              <img
                src={appeal.image}
                alt={appeal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <h3 className="font-bold text-lg mb-1">{appeal.title}</h3>
                <p className="text-sm text-gray-200 mb-4 line-clamp-2">{appeal.desc}</p>
                <button className="self-start flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  Donate Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/tablet: horizontal pages, each page a vertical stack of 4 cards */}
        <div
          ref={mobileScrollRef}
          className="lg:hidden flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {pages.map((pageAppeals, pageIndex) => (
            <div key={pageIndex} className="snap-start shrink-0 w-full flex flex-col gap-4">
              {pageAppeals.map((appeal) => (
                <div
                  key={appeal.id}
                  className="relative shrink-0 h-56 w-full rounded-xl overflow-hidden group"
                >
                  <img
                    src={appeal.image}
                    alt={appeal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/70 to-black" />
                  <div className="absolute inset-0 flex flex-col justify-center items-end text-right p-5 text-white">
                    <h3 className="font-bold text-lg mb-2 max-w-[65%]">{appeal.title}</h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-3 max-w-[65%]">{appeal.desc}</p>
                    <Link to='/donation' className="flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                      Donate Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Dot pagination — mobile/tablet only, controls horizontal page scroll */}
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

        {/* View all banner */}
        <ViewAllBanner
          text={
            <>
              Every act of kindness creates a <span className="font-semibold text-gray-900">ripple of hope</span>. <span className='hidden lg:block'>Be the reason someone smiles today.</span>
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