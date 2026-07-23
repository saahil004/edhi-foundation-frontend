import { useState } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { stripePromise } from '../../lib/stripe.js'

const PaymentForm = ({ billingDetails, onSuccess, onError, submitLabel }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setSubmitting(true)
    setError('')

    // redirect: 'if_required' keeps the donor on this page for the common
    // case — Stripe only navigates away if the specific payment method
    // truly requires an off-site step it can't do inline. Name/email are
    // already mandatory in our own donor info step, so they're passed
    // through here rather than asked for again by the Payment Element
    // (which is configured below to not collect them itself).
    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        payment_method_data: { billing_details: billingDetails },
      },
    })

    if (confirmError) {
      setSubmitting(false)
      setError(confirmError.message ?? 'Payment failed. Please try again.')
      onError?.(confirmError)
      return
    }

    setSubmitting(false)
    onSuccess?.(paymentIntent)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          fields: { billingDetails: { name: 'never', email: 'never', phone: 'never' } },
        }}
      />

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg transition-colors"
      >
        {submitting ? 'Processing...' : submitLabel}
      </button>
    </form>
  )
}

const CheckoutPaymentForm = ({ clientSecret, billingDetails, onSuccess, onError, submitLabel = 'Confirm Payment' }) => {
  const options = { clientSecret, appearance: { theme: 'stripe' } }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
      <h2 className="font-bold text-gray-900 mb-4">Payment Details</h2>
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm billingDetails={billingDetails} onSuccess={onSuccess} onError={onError} submitLabel={submitLabel} />
      </Elements>
    </div>
  )
}

export default CheckoutPaymentForm
