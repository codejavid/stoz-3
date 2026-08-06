import { useEffect, useState } from 'react'

/**
 * Simple hook to fetch data from an async function.
 * @param {() => Promise<any>} fetchFn - Function that returns a promise
 */
function useFetch(fetchFn) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFn()
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [fetchFn])

  return { data, loading, error }
}

export default useFetch
