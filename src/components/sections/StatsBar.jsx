import { Users, MessageSquare, FileText, Trophy } from 'lucide-react'
import { stats } from '../../data/statsData'

const iconMap = {
  users: Users,
  message: MessageSquare,
  file: FileText,
  trophy: Trophy,
}

const StatsBar = () => {
  return (
    <section className="w-full bg-red-900 opacity-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon]

            return (
              <div key={stat.id} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
                  <Icon className="text-white" size={26} />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {stat.value} <span className='text-red-950'>+</span>
                </h3>
                <p className="text-white text-sm mt-1">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsBar