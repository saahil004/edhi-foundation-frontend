import { useRef, useState, useEffect } from 'react'
import { useAppeals } from '../../hooks/useAppeals.js'
import ViewAllBanner from '../ui/ViewAllBanner'
import AppealCard from '../ui/AppealCard.jsx'

const CARDS_PER_PAGE = 4
const HOME_APPEALS_LIMIT = 4

const AppealsCarousel = () => {
  const { appeals: allAppeals, loading } = useAppeals()
  const appeals = allAppeals.slice(0, HOME_APPEALS_LIMIT)
  const mobileScrollRef = useRef(null)
  const [activeCard, setActiveCard] = useState(0)

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
  }, [loading])

  if (loading) return null

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600" /> OUR APPEALS
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Donation Appeals</h2>
          <p className="text-gray-500 mt-2 max-w-md">
            Your generosity can bring hope, restore dignity and change lives for the better.
          </p>
        </div>

        {/* Desktop: horizontal row, 4 visible, side-overlay cards */}
        <div className="hidden lg:flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
          {appeals.map((appeal, i) => (
            <AppealCard
              key={appeal.id}
              slug={appeal.slug}
              title={appeal.title}
              desc={appeal.desc}
              image={appeal.image}
              delay={(i % CARDS_PER_PAGE) * 0.08}
              className="snap-start shrink-0 h-90 w-[calc(25%-18px)]"
            />
          ))}
        </div>

        {/* Mobile/tablet: horizontal scroll, ~1.5 cards visible at a time */}
        <div
          ref={mobileScrollRef}
          className="lg:hidden flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {appeals.map((appeal, i) => (
            <AppealCard
              key={appeal.id}
              slug={appeal.slug}
              title={appeal.title}
              desc={appeal.desc}
              image={appeal.image}
              delay={(i % 4) * 0.08}
              className="snap-start shrink-0 w-[75%] sm:w-[60%] h-72"
            />
          ))}
        </div>

        {/* Dot pagination — one dot per appeal */}
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
