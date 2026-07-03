import { Heart } from 'lucide-react'
import ProgressBar from './ProgressBar'

const ServiceCard = ({ title, desc, image, raised, goal }) => {
  const percent = Math.round((raised / goal) * 100)

  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white flex flex-col">
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      <div className="p-5 flex flex-col flex-1">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
          <Heart className="text-green-700" size={18} />
        </div>

        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 flex-1">{desc}</p>

        <ProgressBar percent={percent} color="bg-green-600" />
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2 mb-4">
          <span>Donation {percent}%</span>
          <span>Raised: ${raised.toLocaleString()}</span>
        </div>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors">
          Donate Now <Heart size={16} />
        </button>
      </div>
    </div>
  )
}

export default ServiceCard