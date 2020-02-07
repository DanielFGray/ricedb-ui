import { useState, useEffect } from 'react'

export default function useJson(
  url: string,
  {
    autoFetch = true,
    initData = null,
    ...props
  }: any = {},
): [
    {
      data: any;
      error: null;
      loading: boolean;
    },
    ((url: string, opts: any) => void),
  ] {
  const [state, setState] = useState({
    data: initData,
    error: null,
    loading: true,
  })

  const refetch = (u = url, { ...opts } = props) => {
    if (! url) throw new Error('refetch needs a url')

    setState({ ...state, loading: true })
    fetch(u, { ...props, ...opts })
      .then(x => x.json())
      .then(data => setState({ data, error: null, loading: false }))
      .catch(e => setState({ ...state, error: e.message, loading: false }))
  }

  useEffect(() => {
    if (url && autoFetch) {
      refetch()
    }
  }, [url, autoFetch])

  return [state, refetch]
}
