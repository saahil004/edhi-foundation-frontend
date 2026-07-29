import { useState } from 'react'

const WIDTH = 700
const HEIGHT = 220
const PADDING = { top: 16, right: 8, bottom: 28, left: 8 }
const COLOR = '#2a78d6' // categorical slot 1 (blue) — single series, so one hue throughout

// Parsing "YYYY-MM-DD" via `new Date(str)` reads it as UTC midnight, which can
// shift the displayed date back a day in timezones behind UTC — forcing a
// local-midnight time component avoids that.
const parseDate = (dateString) => new Date(`${dateString}T00:00:00`)

const formatShortDate = (dateString) =>
  parseDate(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

/**
 * 30-day donation trend — single-series line + area, following the dataviz
 * skill's marks (2px line, ~10% area wash, hairline gridlines) and its
 * interaction contract (crosshair + tooltip on hover for a line chart).
 */
const DonationTrendChart = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState(null)

  const plotWidth = WIDTH - PADDING.left - PADDING.right
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom
  const maxAmount = Math.max(...data.map((d) => d.amount), 1) * 1.15

  const xAt = (i) => PADDING.left + (i / (data.length - 1)) * plotWidth
  const yAt = (amount) => PADDING.top + plotHeight - (amount / maxAmount) * plotHeight

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(d.amount)}`).join(' ')
  const areaPath = `${linePath} L ${xAt(data.length - 1)} ${PADDING.top + plotHeight} L ${xAt(0)} ${PADDING.top + plotHeight} Z`

  const gridFractions = [0, 0.25, 0.5, 0.75, 1]

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relativeX = ((e.clientX - rect.left) / rect.width) * WIDTH
    const fraction = Math.min(Math.max((relativeX - PADDING.left) / plotWidth, 0), 1)
    setHoverIndex(Math.round(fraction * (data.length - 1)))
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {gridFractions.map((fraction) => {
          const y = PADDING.top + plotHeight - fraction * plotHeight
          return (
            <line
              key={fraction}
              x1={PADDING.left}
              x2={WIDTH - PADDING.right}
              y1={y}
              y2={y}
              stroke="#e1e0d9"
              strokeWidth="1"
            />
          )
        })}

        <path d={areaPath} fill={COLOR} opacity="0.1" stroke="none" />
        <path d={linePath} fill="none" stroke={COLOR} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {[0, Math.floor((data.length - 1) / 2), data.length - 1].map((i) => (
          <text
            key={i}
            x={xAt(i)}
            y={HEIGHT - 8}
            fontSize="10"
            fill="#898781"
            textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}
          >
            {formatShortDate(data[i].date)}
          </text>
        ))}

        {hovered && (
          <>
            <line
              x1={xAt(hoverIndex)}
              x2={xAt(hoverIndex)}
              y1={PADDING.top}
              y2={PADDING.top + plotHeight}
              stroke="#c3c2b7"
              strokeWidth="1"
            />
            <circle cx={xAt(hoverIndex)} cy={yAt(hovered.amount)} r="6" fill="#fcfcfb" />
            <circle cx={xAt(hoverIndex)} cy={yAt(hovered.amount)} r="4" fill={COLOR} />
          </>
        )}
      </svg>

      {hovered && (
        <div
          className="absolute top-0 pointer-events-none bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
          style={{ left: `${(xAt(hoverIndex) / WIDTH) * 100}%`, transform: 'translate(-50%, -8px)' }}
        >
          <p className="font-semibold">
            ${hovered.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-gray-300">
            {parseDate(hovered.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  )
}

export default DonationTrendChart
