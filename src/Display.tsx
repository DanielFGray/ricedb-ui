import React from 'react'
import ago from 's-ago'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { Linkify } from './utils'

function makeEmbeddable(x: string): JSX.Element | JSX.Element[] {
  if (/^https?:\/\/.*\.(png|jpe?g|gif)$/i.test(x)) {
    return (
      <a
        key={x}
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.preventDefault()}
      >
        <img src={x} alt={x} style={{ maxWidth: '50vw' }} />
      </a>
    )
  }
  if (/^https?:\/\/.*\.(mp4|webm)$/i.test(x)) {
    return (
      <video key={x} width="75%" autoPlay controls muted loop>
        <source src={x} type={`video/${x.match(/\.(\w+)$/g)?.pop()}`} />
      </video>
    )
  }
  return Linkify(x)
}

function niceDate(label: string, timestamp?: number) {
  if (! timestamp) return null
  const d = new Date(timestamp * 1000)
  return (
    <div>
      <b>{label}</b>
      {': '}
      {ago(d)}
      {' '}
      {d.toLocaleString()}
    </div>
  )
}


export default function Display({ selectedNick }: { selectedNick: string }) {
  const data = useSelector((state: RootState) => state.ricedb.data)
  const { deadsince, last_seen: lastSeen, nick: _n, ...userData } = data
    ?.find(x => selectedNick === x.nick) || {}
  return (
    <div className="displayarea">
      <div>
        <h1>{selectedNick}</h1>
        {niceDate('last seen', lastSeen)}
        {niceDate('dead since', deadsince)}
      </div>
      {Object.entries(userData).map(([k, v]) => (
        <div className={`entry ${k}`} key={k}>
          <h2>{k}</h2>
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
