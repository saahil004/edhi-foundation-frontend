import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * @returns {{ payments: Array, loading: boolean, error: Error|null, page: number, setPage: Function, lastPage: number, totalGiven: number, totalPayments: number }}
 */
export function usePaymentHistory() {
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [totalGiven, setTotalGiven] = useState(0)
  const [totalPayments, setTotalPayments] = useState(0)

  useEffect(() => {
    // No fetch for a logged-out user — loading/payments just stay at their
    // initial values, which is fine since the page redirects away before
    // ever rendering them in that case.
    if (!user) return

    let cancelled = false
    setLoading(true)

    apiFetch(`/donations?page=${page}`)
      .then((res) => {
        if (cancelled) return
        setPayments(res.data)
        setLastPage(res.meta.last_page)
        setTotalPayments(res.meta.total)
        setTotalGiven(res.stats.total_given)
        setError(null)
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
  }, [user, page])

  return { payments, loading, error, page, setPage, lastPage, totalGiven, totalPayments }
}
