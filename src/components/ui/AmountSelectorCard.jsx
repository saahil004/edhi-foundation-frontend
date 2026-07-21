const quickAmounts = [10, 25, 50, 100, 250, 500]
const currencyOptions = ['USD $', 'PKR RS']

const AmountSelector = ({ program, amount, customAmount, priceOptionId, onSelectPreset, onSelectPriceOption, onCustomAmountChange }) => {
  const priceOptions = program?.priceOptions ?? []
  const allowCustomAmount = program?.allowOptionalPrice ?? true
  const hasFixedTiers = priceOptions.length > 0

  const handlePriceOptionClick = (option) => {
    onSelectPriceOption(option.id, option.price)
  }

  const handlePresetClick = (value) => {
    onSelectPreset(value)
  }

  const handleCustomChange = (e) => {
    onCustomAmountChange(e.target.value)
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            How much would you like to donate today?
          </h2>
          <p className="text-sm text-gray-500">
            All donations directly impact our organization and help us further our mission.
          </p>
        </div>

        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 shrink-0">
          {currencyOptions.map((curr, index) => (
            <option key={index}>{curr}</option>
          ))}
        </select>
      </div>

      <p className="text-sm font-medium text-gray-700 mb-3">
        Donation Amount <span className="text-red-600">*</span>
      </p>

      {hasFixedTiers ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
          {priceOptions.map((option) => {
            const isSelected = priceOptionId === option.id

            return (
              <button
                key={option.id}
                onClick={() => handlePriceOptionClick(option)}
                className={`relative px-4 py-3 rounded-lg font-semibold border transition-colors text-left ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="block text-sm">{option.name}</span>
                <span className="block">${option.price.toFixed(2)}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {quickAmounts.map((value) => {
            const isSelected = !priceOptionId && amount === value && !customAmount

            return (
              <button
                key={value}
                onClick={() => handlePresetClick(value)}
                className={`relative px-4 py-3 rounded-lg font-semibold border transition-colors ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
                }`}
              >
                ${value.toFixed(2)}
              </button>
            )
          })}
        </div>
      )}

      {allowCustomAmount && (
        <input
          type="number"
          placeholder="Enter custom amount"
          value={customAmount}
          onChange={handleCustomChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
        />
      )}
    </div>
  )
}

export default AmountSelector
