import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'

/**
 * @returns {{ summary: object|null, loading: boolean, error: Error|null }}
 */
export function useAdminDashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    apiFetch('/admin/dashboard/summary')
      .then((res) => {
        if (cancelled) return
        setSummary(res)
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
  }, [])

  return { summary, loading, error }
}
