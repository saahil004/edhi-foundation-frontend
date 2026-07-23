import { loadStripe } from '@stripe/stripe-js'

// A module-level singleton — loadStripe() should only ever be called once
// per publishable key; calling it again on every render is wasteful and
// can trigger Stripe.js console warnings.
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
