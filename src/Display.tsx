import React from 'react'
import ago from 's-ago'
import { useSelector } from 'react-redux'
import { RootState } from './store'

function makeEmbeddable(x: string): string | JSX.Element | (string | JSX.Element)[] {
  if (x.includes(' ')) {
    return x.split(' ').flatMap(makeEmbeddable)
  }
  if (/^https?:\/\/.*\.(png|jpe?g|gif)$/.test(x)) {
    return (
      <a
        key={x}
        href={x}
        target="__blank"
        rel="noopener noreferrer"
        onClick={e => e.preventDefault()}
      >
        <img src={x} alt={x} style={{ maxWidth: '50vw' }} />
      </a>
    )
  }
  if (/^https?:\/\/.*\.(mp4|webm)$/.test(x)) {
    return (
      <video key={x} width="75%" autoPlay controls muted loop>
        <source src={x} type={`video/${x.match(/\.(\w+)$/g)?.pop()}`} />
      </video>
    )
  }
  if (/^https?:\/\//.test(x)) {
    return <a key={x} href={x}>{x}</a>
  }
  return x
}

function niceDate(label: string, timestamp?: number) {
  if (! timestamp) return null
  const d = new Date(timestamp * 1000)
  return (
    <div>
      {label}
      {ago(d)}
      {' '}
      {d.toLocaleString()}
    </div>
  )
}

export default function Display({ selectedNick }: { selectedNick: string }) {
  const data = useSelector((state: RootState) => state.ricedb.data)
  const { deadsince, last_seen: lastSeen, ...userData } = (data && data[selectedNick]) ?? {}
  return (
    <div className="displayarea">
      <div>
        <h2>{selectedNick}</h2>
        {niceDate('last seen', lastSeen)}
        {niceDate('dead since', deadsince)}
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
