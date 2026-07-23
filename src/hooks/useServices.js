import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'
import { services as dummyServices } from '../data/servicesData.js'

// The dummy data file is kept intact and reused here only as a slug -> icon
// lookup, since icons are a frontend-only concept with no backend field.
// Real content (title/desc/image/raised/goal) comes from the live API.
const slugToIconKey = dummyServices.reduce((acc, s) => ({ ...acc, [s.slug]: s.icon }), {})

/**
 * @returns {{ services: Array, loading: boolean, error: Error|null }}
 */
export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    apiFetch('/services')
      .then((res) => {
        if (cancelled) return
        setServices(
          res.data.map((s) => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            desc: s.description,
            image: s.img,
            icon: slugToIconKey[s.slug],
            raised: s.raised_amount,
            goal: s.goal_amount,
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

  return { services, loading, error }
}
