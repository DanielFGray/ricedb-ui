import React from 'react'
import { type } from 'ramda'

const makeEmbeddable = x => {
  if (/\.(png|jpe?g|gif)$/.test(x)) {
    return (
      <a href={x}>
        <img src={x} alt={x} width="75%" />
      </a>
    )
  } else if (/.(mp4|webm)$/.test(x)) {
    return (
      <video
        src={x}
        width="75%"
        autoPlay="true"
        controls="trues"
        muted="true"
        loop="forever"
      />
    )
  } else if (x.startsWith('http')) {
    return <a href={x}>{x}</a>
  }
  return x
}

const entry = ([k, v]) => (
  <div className={`entry ${k}`} key={k}>
    <h3>{k}</h3>
    <ul>
      {type(v) === 'Array'
        ? v.map(x => <li key={x}>{makeEmbeddable(x)}</li>)
        : v}
    </ul>
  </div>
)

const Display = ({ name, category, last_seen, deadsince, ...data }) => (
  <>
    <h2>{name}</h2>
    {category !== 'all' && data[category]
      ? entry([category, data[category]])
      : Object.entries(data).map(entry)}
  </>
)
export default Display
