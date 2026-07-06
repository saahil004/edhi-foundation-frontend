import { Heart, ArrowRight } from 'lucide-react'
import { hero } from '../../data/heroData'

const Hero = () => {
  return (
    <section className="w-full bg-white overflow-hidden h-fit">
      <div className="max-w-7xl mx-auto lg:px-6 lg:py-12 grid grid-cols-1 lg:grid-cols-2 lg:gap-10 items-center">

        {/* Image + overlay wrapper (mobile: full bleed with overlaid text; desktop: image only) */}
        <div className="relative w-full h-150 sm:h-160 md:h-170 lg:h-115 order-1">
          <img
            src={hero.image}
            alt="Children supported by Edhi Foundation"
            className="w-full h-full object-cover border-0 lg:rounded-2xl"
          />

          {/* Desktop-only fade so the right edge of the image blends into white */}
          <div className="hidden lg:block absolute inset-0 bg-linear-to-l from-white via-white/10 to-transparent pointer-events-none" />

          {/* Mobile/tablet-only fade so the left edge of the image blends into white, text sits in that faded area */}
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 to-transparent lg:hidden pointer-events-none" />

          {/* Text content overlaid on the faded left area for mobile/tablet */}
          <div className="absolute inset-0 flex flex-col justify-start p-6 sm:p-8 lg:hidden">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Heart className="text-green-700" size={22} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight max-w-[70%]">
              {hero.headingLine1} <br />
              {hero.headingLine2} <br />
              <span className="text-green-600">{hero.headingHighlight}</span>
            </h1>

            <p className="text-gray-500 mt-5 max-w-[65%] sm:max-w-sm">
              {hero.subtext}
            </p>
          </div>

          {/* Buttons pinned to bottom-right of the image, mobile/tablet only */}
          <div className="absolute bottom-6 right-6 flex flex-col sm:flex-row items-end sm:items-center gap-3 lg:hidden">
            <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded transition-colors text-sm sm:text-base">
              Donate Now <Heart size={16} />
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-5 py-2.5 rounded transition-colors text-sm sm:text-base">
              Our Impact <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Desktop-only text content (left column) */}
        <div className="relative z-10 order-2 hidden lg:block">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Heart className="text-green-700" size={22} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {hero.headingLine1} <br />
            {hero.headingLine2} <br />
            <span className="text-green-600">{hero.headingHighlight}</span>
          </h1>

          <p className="text-gray-500 mt-5 max-w-md">
            {hero.subtext}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors">
              Donate Now <Heart size={18} />
            </button>
            <button className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-6 py-3 rounded transition-colors">
              Our Impact <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero