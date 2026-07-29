// Nominal categories (program names) — every bar takes the same slot-1 hue
// rather than being colored by its own value, which would just re-encode
// the magnitude that bar length already shows.
const COLOR = '#2a78d6'

const TopProgramsChart = ({ programs }) => {
  if (programs.length === 0) {
    return <p className="text-sm text-gray-500">No completed donations yet.</p>
  }

  const maxAmount = Math.max(...programs.map((p) => p.amount), 1)

  return (
    <div className="space-y-3">
      {programs.map((program) => (
        <div key={program.name}>
          <div className="flex items-center justify-between text-sm mb-1 gap-2">
            <span className="font-medium text-gray-700 truncate">{program.name}</span>
            <span className="font-semibold text-gray-900 shrink-0">
              ${program.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${(program.amount / maxAmount) * 100}%`, backgroundColor: COLOR }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopProgramsChart
