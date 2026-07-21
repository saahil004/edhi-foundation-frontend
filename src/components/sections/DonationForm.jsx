import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DonationStepper from '../ui/DonationStep.jsx'
import ServiceSelector from '../ui/ServiceSelector.jsx'
import ProgramSelector from '../ui/ProgramSelector.jsx'
import AmountSelector from '../ui/AmountSelectorCard.jsx'
import FrequencySelector from '../ui/FrequencySelector.jsx'
import DonorInfoForm from '../ui/DonorInfoForm.jsx'
import ConsentCheckbox from '../ui/ConsentCheckbox.jsx'
import GrandTotal from '../ui/GrandTotal.jsx'
import DonationConfirmation from '../ui/DonationConfirmation.jsx'
import { services } from '../../data/servicesData.js'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const DonationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(services?.[0]?.id ?? null)
  const [selectedProgramId, setSelectedProgramId] = useState(services?.[0]?.programs?.[0]?.id ?? null)
  const [priceOptionId, setPriceOptionId] = useState(null)
  const [amount, setAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState('yearly')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+92',
    phone: '',
  })
  const [consentGiven, setConsentGiven] = useState(false)

  const currentService = services.find((s) => s.id === selectedService)
  const currentProgram = currentService?.programs.find((p) => p.id === selectedProgramId) ?? currentService?.programs[0]

  // Switching service resets program/tier selection since a program belongs
  // to exactly one service on the backend.
  useEffect(() => {
    const firstProgram = currentService?.programs[0]
    setSelectedProgramId(firstProgram?.id ?? null)
    setPriceOptionId(null)
    setCustomAmount('')
  }, [selectedService])

  const handleSelectProgram = (programId) => {
    setSelectedProgramId(programId)
    setPriceOptionId(null)
    setCustomAmount('')
  }

  const handleSelectPriceOption = (optionId, price) => {
    setPriceOptionId(optionId)
    setAmount(price)
    setCustomAmount('')
  }

  const handleSelectPresetAmount = (value) => {
    setPriceOptionId(null)
    setAmount(value)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value) => {
    setPriceOptionId(null)
    setCustomAmount(value)
  }

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : (amount || 0)

  const isStep1Valid = Boolean(selectedService && currentProgram && finalAmount > 0)
  const isDonorInfoComplete = Boolean(
    formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && formData.phone.trim()
  )
  const canCheckout = isDonorInfoComplete && consentGiven

  const goToStep = (step) => setCurrentStep(Math.min(Math.max(step, 1), 4))
  const handleNext = () => goToStep(currentStep + 1)
  const handleBack = () => goToStep(currentStep - 1)

  const handleCheckout = () => {
    if (!canCheckout) return

    // TODO: once the frontend is wired to the API, POST here to
    // /api/donations with { program_id: currentProgram.id, price_option_id:
    // priceOptionId, amount: finalAmount, ...formData }, then use the
    // returned Stripe client_secret to confirm payment (still on this page)
    // before advancing to the confirmation step.
    goToStep(4)
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
      <div>
        <DonationStepper currentStep={currentStep} />
      </div>

      {/*
        Each step gets its own motion.div with explicit initial/animate (not
        whileInView) and a key tied to currentStep. whileInView only fires
        once per element for the whole page's first scroll-into-view — new
        step content mounting later into an already-settled parent would
        never receive its own trigger and stay stuck at itemVariants.hidden
        (opacity: 0), i.e. invisible. Explicit animate="visible" here fires
        fresh every time a step mounts.
      */}

      {currentStep === 1 && (
        <motion.div
          key="step-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <ServiceSelector
              services={services}
              selectedService={selectedService}
              onSelect={setSelectedService}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ProgramSelector
              programs={currentService?.programs ?? []}
              selectedProgram={selectedProgramId}
              onSelect={handleSelectProgram}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AmountSelector
              program={currentProgram}
              amount={amount}
              customAmount={customAmount}
              priceOptionId={priceOptionId}
              onSelectPreset={handleSelectPresetAmount}
              onSelectPriceOption={handleSelectPriceOption}
              onCustomAmountChange={handleCustomAmountChange}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className={`px-8 py-4 rounded-lg font-bold transition-colors ${
                isStep1Valid
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </motion.div>
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div
          key="step-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <FrequencySelector
              frequency={frequency}
              onSelect={setFrequency}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleBack}
              className="w-full border border-green-800 text-green-800 font-bold py-4 rounded-lg hover:bg-green-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors"
            >
              Next
            </button>
          </motion.div>
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div
          key="step-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <DonorInfoForm
              formData={formData}
              onChange={setFormData}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ConsentCheckbox checked={consentGiven} onChange={setConsentGiven} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GrandTotal
              amount={finalAmount}
              frequency={frequency}
              onBack={handleBack}
              onCheckout={handleCheckout}
              disabled={!canCheckout}
              serviceName={currentProgram?.name ?? currentService?.title}
            />
          </motion.div>
        </motion.div>
      )}

      {currentStep === 4 && (
        <motion.div key="step-4" variants={itemVariants} initial="hidden" animate="visible">
          <DonationConfirmation
            amount={finalAmount}
            frequency={frequency}
            serviceName={currentProgram?.name ?? currentService?.title}
          />
        </motion.div>
      )}
    </section>
  )
}

export default DonationForm
