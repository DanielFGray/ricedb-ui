import React from 'react'

export default function Stringify(props: any) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}
