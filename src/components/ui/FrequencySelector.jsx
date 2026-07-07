import { CalendarPlus, CalendarClock, CalendarDays, Check } from 'lucide-react'

const frequencies = [
  { id: 'single', label: 'Single /', label2: 'One-Time', icon: CalendarPlus },
  { id: 'weekly', label: 'Weekly', icon: CalendarClock },
  { id: 'monthly', label: 'Monthly', icon: CalendarDays },
  { id: 'yearly', label: 'Yearly', icon: CalendarClock },
]

const FrequencySelector = ({ frequency, onSelect }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        How often would you like to pay this?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {frequencies.map((option) => {
          const Icon = option.icon
          const isSelected = frequency === option.id

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border transition-colors ${
                isSelected
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'
              }`}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <Check className="text-red-600" size={14} strokeWidth={3} />
                </span>
              )}

              <Icon
                className={isSelected ? 'text-white' : 'text-green-700'}
                size={40}
                strokeWidth={1.5}
              />

              <span className="font-bold text-center leading-tight">
                {option.label}
                {option.label2 && <><br />{option.label2}</>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FrequencySelector