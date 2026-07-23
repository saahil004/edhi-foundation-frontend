import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'

/**
 * @returns {{ appeals: Array, loading: boolean, error: Error|null }}
 */
export function useAppeals() {
  const [appeals, setAppeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    apiFetch('/appeals')
      .then((res) => {
        if (cancelled) return
        setAppeals(
          res.data.map((a) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            desc: a.description,
            image: a.img,
          }))
        )
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

  return { appeals, loading, error }
}
