import { useState } from 'react'

// Fixed status scale, never themed — distinct from the categorical palette
// so a status color never impersonates a data series. "Refunded" isn't part
// of the standard good/warning/critical ladder (it's neutral, not alarming),
// so it gets a plain neutral gray rather than borrowing a status step.
const STATUS_CONFIG = [
  { key: 'completed', label: 'Completed', color: '#0ca30c' },
  { key: 'pending', label: 'Pending', color: '#fab219' },
  { key: 'failed', label: 'Failed', color: '#d03b3b' },
  { key: 'refunded', label: 'Refunded', color: '#9c9b95' },
]

const StatusBreakdownChart = ({ breakdown }) => {
  const [hoveredKey, setHoveredKey] = useState(null)
  const total = STATUS_CONFIG.reduce((sum, s) => sum + (breakdown[s.key] ?? 0), 0)

  if (total === 0) {
    return <p className="text-sm text-gray-500">No donations recorded yet.</p>
  }

  return (
    <div>
      <div className="flex h-8 w-full gap-0.5 rounded-full overflow-hidden bg-gray-100">
        {STATUS_CONFIG.map((status) => {
          const count = breakdown[status.key] ?? 0
          if (count === 0) return null

          const percent = (count / total) * 100

          return (
            <div
              key={status.key}
              className="relative h-full transition-opacity"
              style={{
                width: `${percent}%`,
                backgroundColor: status.color,
                opacity: hoveredKey && hoveredKey !== status.key ? 0.5 : 1,
              }}
              onMouseEnter={() => setHoveredKey(status.key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              {hoveredKey === status.key && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap pointer-events-none z-10">
                  <span className="font-semibold">{count}</span> {status.label} ({percent.toFixed(1)}%)
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
        {STATUS_CONFIG.map((status) => (
          <div key={status.key} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: status.color }} />
            <span className="text-gray-600">{status.label}</span>
            <span className="font-semibold text-gray-900">{breakdown[status.key] ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusBreakdownChart
