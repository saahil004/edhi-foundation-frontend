import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  const [activeCard, setActiveCard] = useState(0)

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
    const card = mobileScrollRef.current.children[0]
    const cardWidth = card ? card.offsetWidth + 16 : 300 // +16 accounts for the gap-4
    mobileScrollRef.current.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    })
  }

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const { scrollLeft, children } = mobileScrollRef.current
    const card = children[0]
    if (!card) return
    const cardWidth = card.offsetWidth + 16
    const index = Math.round(scrollLeft / cardWidth)
    setActiveCard(index)
  }

  const goToCard = (index) => {
    if (!mobileScrollRef.current) return
    const card = mobileScrollRef.current.children[0]
    const cardWidth = card ? card.offsetWidth + 16 : 300
    mobileScrollRef.current.scrollTo({
      left: index * cardWidth,
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
          {appeals.map((appeal, i) => (
            <motion.div
              key={appeal.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (i % CARDS_PER_PAGE) * 0.08, ease: 'easeOut' }}
              className="relative snap-start shrink-0 h-90 w-[calc(25%-18px)] rounded-xl overflow-hidden group"
            >
              <img
                src={appeal.image}
                alt={appeal.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <h3 className="font-bold text-lg mb-1">{appeal.title}</h3>
                <p className="text-sm text-gray-200 mb-4 line-clamp-2">{appeal.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="self-start flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Donate Now <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/tablet: horizontal scroll, ~1.5 cards visible at a time */}
<div
  ref={mobileScrollRef}
  className="lg:hidden flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
>
  {appeals.map((appeal, i) => (
    <motion.div
      key={appeal.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: 'easeOut' }}
      className="relative snap-start shrink-0 w-[75%] sm:w-[60%] h-72 rounded-xl overflow-hidden group"
    >
      <img
        src={appeal.image}
        alt={appeal.title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
        <h3 className="font-bold text-lg mb-1">{appeal.title}</h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-2">{appeal.desc}</p>
        <Link
          to="/donation"
          className="self-start flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          More Info <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  ))}
</div>

         {/* Dot pagination — now one dot per appeal, not per page of 4 */}
      {appeals.length > 1 && (
        <div className="flex lg:hidden items-center justify-center gap-2 mt-6">
          {appeals.map((_, i) => (
            <button
              key={i}
              onClick={() => goToCard(i)}
              aria-label={`Go to appeal ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                activeCard === i ? 'bg-red-600' : 'bg-gray-300'
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