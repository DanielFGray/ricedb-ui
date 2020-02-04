import React, { useState } from 'react'
import { Loader } from 'semantic-ui-react'
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
      >
        <img src={x} alt={x} />
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


export default function Display({ selectedNick, loading }: {
  selectedNick: string;
  loading: boolean;
}) {
  const [viewMode, setViewMode] = useState('grid')
  const data = useSelector((state: RootState) => state.ricedb.data)
  const { deadsince, last_seen: lastSeen, nick: _n, ...userData } = data
    ?.find(x => selectedNick === x.nick) || {}
  return (
    <div className="displayarea">
      <div>
        <h1>{selectedNick}</h1>
        {niceDate('last seen', lastSeen)}
        {niceDate('dead since', deadsince)}
        {data && selectedNick && (
          <>
            <div>
              <input type="radio" checked={viewMode === 'grid'} id="grid" onChange={() => setViewMode('grid')} /> <label htmlFor="grid">grid view</label>
            </div>
            <div>
              <input type="radio" checked={viewMode === 'list'} id="list" onChange={() => setViewMode('list')} /> <label htmlFor="list">list view</label>
            </div>
          </>
        )}
      </div>
      {loading
        ? <>Loading...<Loader active inline="centered" /></>
        : (
          <div className={viewMode}>
            {Object.entries(userData).map(([k, v]) => (
              <div className={`entry ${k}`} key={k}>
                <h2>{k}</h2>
                <ul>
                  {v instanceof Array ? v.map((x, i) => <li key={`${x}_${i}`}>{makeEmbeddable(x)}</li>)
                  : k === 'lastfm' ? makeEmbeddable(`https://last.fm/user/${v}`)
                  : v}
                </ul>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
