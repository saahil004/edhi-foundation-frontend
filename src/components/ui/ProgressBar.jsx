const ProgressBar = ({ percent, color = 'bg-red-600' }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar