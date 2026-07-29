const StatTile = ({ label, value, caption, delta, deltaLabel }) => {
  const hasDelta = delta !== undefined && delta !== null
  const isPositive = hasDelta && delta > 0
  const isNegative = hasDelta && delta < 0

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 mt-1">
        {value}
        {caption && <span className="text-sm font-medium text-gray-400 ml-1.5">{caption}</span>}
      </p>
      {hasDelta && (
        <p
          className={`text-xs font-semibold mt-1.5 ${
            isPositive ? 'text-green-700' : isNegative ? 'text-red-700' : 'text-gray-500'
          }`}
        >
          {isPositive ? '↑' : isNegative ? '↓' : '–'} {Math.abs(delta).toFixed(1)}% {deltaLabel}
        </p>
      )}
    </div>
  )
}

export default StatTile
