import { useEffect, useRef, useState } from 'react'
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
import CheckoutPaymentForm from '../checkout/CheckoutPaymentForm.jsx'
import InlineAuthGate from '../checkout/InlineAuthGate.jsx'
import { useServices } from '../../hooks/useServices.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { apiFetch } from '../../lib/api.js'
import { isValidPhoneNumber } from '../../utils/phone.js'

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
  const { services, loading: servicesLoading } = useServices()
  const { user } = useAuth()
  const formTopRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceDetail, setServiceDetail] = useState(null)
  const [serviceDetailLoading, setServiceDetailLoading] = useState(false)
  const [selectedProgramId, setSelectedProgramId] = useState(null)
  const [priceOptionId, setPriceOptionId] = useState(null)
  // null (not a default like 10) so isStep1Valid can't be satisfied by a
  // stray leftover value — it only becomes truthy once the donor actually
  // clicks a preset/price-option/custom amount.
  const [amount, setAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState('yearly')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
  })
  const [consentGiven, setConsentGiven] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  const [creatingCheckout, setCreatingCheckout] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const currentService = services.find((s) => s.id === selectedService)
  const currentProgram =
    serviceDetail?.programs.find((p) => p.id === selectedProgramId) ?? serviceDetail?.programs[0]
  const isRecurring = frequency !== 'single'
  const needsAuthGate = isRecurring && !user

  // Default to the first loaded service once the catalog arrives.
  useEffect(() => {
    if (selectedService === null && services.length > 0) {
      setSelectedService(services[0].id)
    }
  }, [services])

  // Runs whenever `user` changes — on mount if already logged in from a
  // previous session, or right after a successful login/register via the
  // optional gate below (login/register in AuthContext update the shared
  // context state, which re-renders this component with the new `user`).
  // A logged-in donor never needs to retype what's already on their account.
  useEffect(() => {
    if (!user) return
    const [firstName, ...rest] = (user.name || '').trim().split(' ')
    setFormData((prev) => ({ ...prev, firstName, lastName: rest.join(' '), email: user.email || '' }))
  }, [user])

  // The public /services list doesn't include nested programs/price options
  // (only /services/{slug} does), so switching service fetches that detail.
  // A program belongs to exactly one service on the backend, so this also
  // resets program/tier selection.
  useEffect(() => {
    const service = services.find((s) => s.id === selectedService)
    if (!service) {
      setServiceDetail(null)
      return
    }

    let cancelled = false
    setServiceDetailLoading(true)

    apiFetch(`/services/${service.slug}`)
      .then((res) => {
        if (cancelled) return
        const detail = {
          ...res.data,
          programs: res.data.programs.map((p) => ({
            id: p.id,
            name: p.name,
            allowOptionalPrice: p.allow_optional_price,
            priceOptions: p.price_options.map((po) => ({ id: po.id, name: po.name, price: po.price })),
          })),
        }
        setServiceDetail(detail)
        setSelectedProgramId(detail.programs[0]?.id ?? null)
        setPriceOptionId(null)
        setAmount(null)
        setCustomAmount('')
      })
      .finally(() => {
        if (!cancelled) setServiceDetailLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [selectedService, services])

  const handleSelectProgram = (programId) => {
    setSelectedProgramId(programId)
    setPriceOptionId(null)
    setAmount(null)
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

  const isStep1Valid = Boolean(
    !servicesLoading && !serviceDetailLoading && selectedService && currentProgram && finalAmount > 0
  )
  const isDonorInfoComplete = Boolean(
    formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && isValidPhoneNumber(formData.phone)
  )
  const canCheckout = isDonorInfoComplete && consentGiven && !needsAuthGate

  const goToStep = (step) => setCurrentStep(Math.min(Math.max(step, 1), 4))
  const handleNext = () => goToStep(currentStep + 1)
  const handleBack = () => goToStep(currentStep - 1)

  // Advancing/going back re-renders fresh content that can be taller or
  // shorter than the previous step — without this, the viewport stays at
  // whatever scroll position it was at, which can land mid-way down (or
  // past) the new step instead of showing it from the top. Skips the very
  // first render so landing on the page doesn't also trigger a jump.
  // Plain scrollIntoView aligns the target's top with the viewport's top,
  // which tucks it directly behind the fixed Navbar/TopBar — offsetting by
  // the fixed header's own height keeps the top of the form actually visible.
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const headerHeight = document.querySelector('nav')?.getBoundingClientRect().bottom ?? 0
    const targetTop = (formTopRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - headerHeight - 16
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  }, [currentStep])

  const handleCheckout = async () => {
    if (!canCheckout || creatingCheckout) return

    setCreatingCheckout(true)
    setCheckoutError('')

    const body = {
      program_id: currentProgram.id,
      ...(priceOptionId ? { price_option_id: priceOptionId } : { amount: finalAmount }),
      ...(isRecurring ? { frequency } : {}),
      donor_name: `${formData.firstName} ${formData.lastName}`.trim(),
      donor_email: formData.email,
      donor_phone: `${formData.countryCode}${formData.phone.replace(/\D/g, '')}`,
    }

    try {
      const res = await apiFetch(isRecurring ? '/subscriptions' : '/donations', { method: 'POST', body })
      setClientSecret(res.client_secret)
    } catch (err) {
      setCheckoutError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setCreatingCheckout(false)
    }
  }

  const handlePaymentSuccess = () => goToStep(4)
  const handleBackFromPayment = () => setClientSecret(null)

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
      <div ref={formTopRef}>
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

      {currentStep === 1 && servicesLoading && (
        <p className="text-gray-500 text-center py-12">Loading services...</p>
      )}

      {currentStep === 1 && !servicesLoading && (
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
              programs={serviceDetail?.programs ?? []}
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

      {currentStep === 3 && !clientSecret && (
        <motion.div
          key="step-3-details"
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

          {!isRecurring && !user && (
            <motion.div variants={itemVariants}>
              <InlineAuthGate
                optional
                name={`${formData.firstName} ${formData.lastName}`.trim()}
                email={formData.email}
                onAuthenticated={() => {}}
              />
            </motion.div>
          )}

          {needsAuthGate ? (
            <motion.div variants={itemVariants}>
              <InlineAuthGate
                name={`${formData.firstName} ${formData.lastName}`.trim()}
                email={formData.email}
                onAuthenticated={() => {}}
              />
            </motion.div>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <ConsentCheckbox checked={consentGiven} onChange={setConsentGiven} />
              </motion.div>

              {checkoutError && (
                <motion.div
                  variants={itemVariants}
                  className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                >
                  {checkoutError}
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <GrandTotal
                  amount={finalAmount}
                  frequency={frequency}
                  onBack={handleBack}
                  onCheckout={handleCheckout}
                  disabled={!canCheckout || creatingCheckout}
                  serviceName={currentProgram?.name ?? currentService?.title}
                />
              </motion.div>
            </>
          )}
        </motion.div>
      )}

      {currentStep === 3 && clientSecret && (
        <motion.div
          key="step-3-payment"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <CheckoutPaymentForm
              clientSecret={clientSecret}
              billingDetails={{
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: `${formData.countryCode}${formData.phone.replace(/\D/g, '')}`,
              }}
              submitLabel={isRecurring ? 'Start Recurring Donation' : 'Confirm Donation'}
              onSuccess={handlePaymentSuccess}
              onError={(err) => setCheckoutError(err.message ?? 'Payment failed.')}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              onClick={handleBackFromPayment}
              className="w-full border border-green-800 text-green-800 font-bold py-4 rounded-lg hover:bg-green-50 transition-colors"
            >
              Back to details
            </button>
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
