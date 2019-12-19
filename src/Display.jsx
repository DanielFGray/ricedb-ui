import React, { useContext } from 'react'
import ago from 's-ago'
import ctx from './ctx'

function makeEmbeddable(x) {
  if (/\.(png|jpe?g|gif)$/.test(x)) {
    return (
      <a
        href={x}
        target="__blank"
        rel="noopener noreferrer"
        onClick={e => e.preventDefault()}
      >
        <img src={x} alt={x} style={{ maxWidth: '50vw' }} />
      </a>
    )
  }
  if (/.(mp4|webm)$/.test(x)) {
    return (
      <video
        width="75%"
        autoPlay
        controls
        muted
        loop="forever"
      >
        <source src={x} type={`video/${x.match(/\.(\w+)$/g).pop()}`} />
      </video>
    )
  }
  if (x.startsWith('http')) {
    return <a href={x}>{x}</a>
  }
  return x
}

function niceDate(timestamp, label) {
  if (! timestamp) return null
  const d = new Date(timestamp * 1000)
  return (
    <div>{label}: {ago(d)} {d.toLocaleString()}</div>
  )
}

export default function Display({ name }) {
  const { data } = useContext(ctx)
  const { deadsince, last_seen: lastSeen, ...userData } = data[name] || {}
  return (
    <div className="displayarea">
      <div>
        <h2>{name}</h2>
        {niceDate(lastSeen, 'last seen')}
        {niceDate(deadsince, 'dead since')}
      </div>
      {Object.entries(userData).map(([k, v]) => (
        <div className={`entry ${k}`} key={k}>
          <h3>{k}</h3>
          <ul>
            {v instanceof Array ? v.map(x => <li key={x}>{makeEmbeddable(x)}</li>)
            : k === 'lastfm' ? makeEmbeddable(`https://last.fm/user/${v}`)
            : v}
          </ul>
        </div>
      ))}
    </div>
  )
}
