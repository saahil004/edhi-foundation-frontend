import { Heart, ArrowRight, Moon } from 'lucide-react'
import ProgressBar from '../ui/ProgressBar'
import recentEvent from '../../data/recentEvent.js'

const FundraiserProgress = () => {
  const { badge, heading, highlight, description, image, raised, goal } = recentEvent
  const percent = Math.round((raised / goal) * 100)

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 shadow-lg rounded-2xl">
            <span className="inline-block text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-3 py-1 rounded-full mb-4">
              {badge}
            </span>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Total Raised Fund</h3>

            <ProgressBar percent={percent} />
            <p className="text-sm text-gray-500 mt-2 mb-4">{percent}%</p>

            <div className="flex items-center gap-6 text-sm">
              <p className="text-gray-700">
                Raised <span className="font-bold text-gray-900">${raised.toLocaleString()}</span>
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <p className="text-gray-700">
                Goal <span className="font-bold text-gray-900">${goal.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="bg-green-900 p-8 relative overflow-hidden text-white flex flex-col justify-center rounded-2xl shadow-lg">
            {image ? (
              <img
                src={image}
                alt={badge}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            ) : (
              <Moon className="absolute right-6 top-6 text-yellow-400/40" size={64} />
            )}

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">
                {heading} <span className="text-green-300">{highlight}</span>
              </h3>
              <p className="text-green-100 text-sm mb-6 max-w-sm">
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded transition-colors">
                  Donate Now <Heart size={16} />
                </button>
                <button className="flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-5 py-2.5 rounded transition-colors">
                  View Our Impact <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FundraiserProgress