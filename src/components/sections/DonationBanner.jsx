import { Heart } from 'lucide-react'
import donationBanner from '../../data/donationBannerData.js'
import DonationIcon from '../../assets/icons/DonationIcon.jsx'

const DonationBanner = () => {
  const { image, heading, subtext } = donationBanner

  return (
    <section className="relative w-full h-72 md:h-96 overflow-hidden">
      {/* Background image */}
      <img
        src={image}
        alt="Hands holding a heart"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Fade overlay: mobile darkens bottom for text legibility, desktop fades left-to-right */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-orange-50/60 md:to-orange-100" />

      {/* Mobile: text centered, pinned near bottom */}
      <div className="absolute inset-x-0 bottom-0 flex md:hidden flex-col items-center text-center py-6 px-6">
        <DonationIcon/>
        <h1 className="text-3xl font-bold text-white mb-2">
          {heading}
        </h1>
        <svg width="80" height="6" viewBox="0 0 80 6" className="mb-3">
          <line x1="0" y1="3" x2="80" y2="3" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <p className="text-gray-200 text-sm">
          {subtext}
        </p>
      </div>

      {/* Desktop: text block occupies right half, centered content */}
      <div className="absolute top-0 bottom-0 right-0 w-1/2 hidden md:flex flex-col justify-center items-center text-center py-8 px-12">
        <DonationIcon/>
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          {heading}
        </h1>
        <svg width="80" height="6" viewBox="0 0 80 6" className="mb-4">
          <line x1="0" y1="3" x2="80" y2="3" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <p className="text-gray-500 text-2xl">
          {subtext}
        </p>
      </div>
    </section>
  )
}

export default DonationBanner