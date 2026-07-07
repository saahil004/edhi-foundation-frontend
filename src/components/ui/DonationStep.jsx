const steps = [
  { number: 1, label: 'Your Donation', subtext: 'Choose amount' },
  { number: 2, label: 'Frequency', subtext: 'Choose how often' },
  { number: 3, label: 'Checkout', subtext: 'Secure payment' },
  { number: 4, label: 'Confirmation', subtext: 'Thank you!' },
]

const DonationStepper = ({ currentStep = 1 }) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
      {steps.map((step, index) => {
        const isActive = step.number <= currentStep

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                  isActive ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number}
              </div>
              <div className="hidden lg:block">
                <p className="font-semibold text-gray-900 text-sm">{step.label}</p>
                <p className="text-xs text-gray-500">{step.subtext}</p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="w-8 md:w-16 h-px bg-gray-300 mx-2 md:mx-4" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DonationStepper