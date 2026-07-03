import { useState, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { founder, teamMembers } from '../../data/founderData'

const FounderSection = () => {
  const scrollRef = useRef(null)
  const [activeMember, setActiveMember] = useState(teamMembers[0])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth / 3
      scrollRef.current.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero: active member spotlight */}
        <div className="rounded-2xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-80 md:h-[420px] w-full">
            <img
              src={activeMember.image}
              alt={activeMember.name}
              className="w-full h-full object-cover"
            />
            {/* Fade into text panel on the right */}
            <div className="hidden md:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-white pointer-events-none" />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600" /> {activeMember.title}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">{activeMember.name}</h2>
            <p className="text-green-700 font-medium mb-4">{activeMember.title}</p>

            {activeMember.bio.map((para, i) => (
              <p key={i} className="text-gray-500 text-sm mb-4 leading-relaxed">
                {para}
              </p>
            ))}

            <button className="w-fit flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold px-5 py-2.5 rounded transition-colors">
              Read Full Story <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Team members row */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => scroll('left')}
            className="shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Scroll team members left"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide border border-gray-200 rounded-xl p-3 w-full"
          >
            {teamMembers.map((member, index) => {
              const isActive = activeMember.id === member.id

              return (
                <button
                  key={member.id}
                  onClick={() => setActiveMember(member)}
                  className={`snap-start shrink-0 w-1/3 flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs text-gray-400 font-semibold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                    <p className="text-red-600 text-xs">{member.title}</p>
                  </div>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Scroll team members right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FounderSection