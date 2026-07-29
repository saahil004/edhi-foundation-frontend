import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'

/**
 * @returns {{ topDonations: Array, totalDonations: number, loading: boolean, error: Error|null }}
 */
export function useTopDonations() {
  const [topDonations, setTopDonations] = useState([])
  const [totalDonations, setTotalDonations] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    apiFetch('/donations/top-donations')
      .then((res) => {
        if (cancelled) return
        setTopDonations(res.top_donations)
        setTotalDonations(res.total_donations)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { topDonations, totalDonations, loading, error }
}
