import { Users, MessageSquare, FileText, Trophy } from 'lucide-react'
import { stats } from '../../data/statsData'
import statsBarBg from '../../assets/images/statscardbg.png'

const iconMap = {
  users: Users,
  message: MessageSquare,
  file: FileText,
  trophy: Trophy,
}

const StatsBar = () => {
  return (
    <section
      className="relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${statsBarBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        maxWidth: '100vw',
      }}
    >
      <div className="absolute inset-0 bg-red-900/80" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon]

            return (
              <div key={stat.id} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
                  <Icon className="text-white" size={26} />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {stat.value} <span className="text-red-950">+</span>
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