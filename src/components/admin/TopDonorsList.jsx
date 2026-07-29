const TopDonorsList = ({ donors }) => {
  if (donors.length === 0) {
    return <p className="text-sm text-gray-500">No completed donations yet.</p>
  }

  return (
    <ol className="divide-y divide-gray-100">
      {donors.map((donor, index) => (
        <li key={donor.email} className="flex items-center justify-between gap-3 py-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-6 h-6 rounded-full bg-green-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{donor.name ?? 'Unknown'}</p>
              <p className="text-xs text-gray-500 truncate">{donor.email}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-900 shrink-0">
            ${donor.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </li>
      ))}
    </ol>
  )
}

export default TopDonorsList
