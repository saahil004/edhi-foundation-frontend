import { Heart, ArrowRight } from 'lucide-react'
import { hero } from '../../data/heroData'

const Hero = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: text content */}
        <div className="relative z-10 order-2 lg:order-1">
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

        {/* Right: hero image, explicit responsive heights */}
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[460px] order-1 lg:order-2">
          <img
            src={hero.image}
            alt="Children supported by Edhi Foundation"
            className="w-full h-full object-cover border-0 rounded-2xl"
          />
          <div className="absolute inset-0 md:bg-linear-to-r from-white via-white/0 to-transparent lg:from-white lg:via-white/10 lg:to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export default Hero