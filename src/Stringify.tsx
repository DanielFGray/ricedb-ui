import React from 'react'

function replacer(k: string, v: any) {
  if (typeof v === 'function') return `[function] ${v.toString()}`
  return v
}

export default function Stringify(props: any) {
  return <pre>{JSON.stringify(props, replacer, 2)}</pre>
}
