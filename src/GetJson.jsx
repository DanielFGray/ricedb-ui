import { useEffect, useState } from 'react'

export default function useJson(url) {
  const [state, state$] = useState({
    data: null,
    loading: false,
    error: null,
  })
  const setState = patch => state$({ ...state, ...patch })
  const refetch = () => {
    setState({ loading: true })
    fetch(url)
      .then(x => x.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ error, loading: false }))
  }
  useEffect(refetch, [url])

  return [state, refetch]
}
