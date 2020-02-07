import React, { useMemo } from 'react'
import { Loader } from 'semantic-ui-react'
import ago from 's-ago'
import { useSelector, useDispatch } from 'react-redux'
import { controls, RootState } from './store'
import { Linkify } from './utils'
import { RiceDbEntry } from './react-app-env'
import Stringify from './Stringify'
import GitHub from './github'

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
      <video key={x} width="75%" autoPlay={false} controls muted loop>
        <source src={x} type={`video/${x.match(/(\w+)$/g)?.pop()}`} />
      </video>
    )
  }
  const ghRe = /^https?:\/\/(www\.)?github.com\/([^/]+)\/?$/

  if (ghRe.test(x)) {
    const matches = ghRe.exec(x)
    if (!matches || !matches[2]) {
      console.log('failed to parse github user')
      return Linkify(x)
    }
    return <GitHub user={matches[2]} />
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
  const { data, loading } = useSelector((state: RootState) => state.ricedb)
  const {
    viewMode,
    showAll,
    selectedCategories,
  } = useSelector((state: RootState) => state.controls)
  const { deadsince, last_seen: lastSeen, nick: _n, ...userData } = data
    ?.find((x: RiceDbEntry) => selectedNick === x.nick) || {}
  const dispatch = useDispatch()

  const displayList = useMemo(() => {
    let list = Object.entries(userData)
    if (! showAll) {
      list = list.filter(([k]) => selectedCategories.includes(k))
    }
    return list
  }, [selectedCategories, userData, showAll])

  if (! selectedNick) {
    return (
      <div className="displayarea">
        hint: use left/right arrow keys
      </div>
    )
  }

  return (
    <div className={`displayarea ${viewMode}`}>
      <div>
        <h1>{selectedNick}</h1>
        {niceDate('last seen', lastSeen)}
        {niceDate('dead since', deadsince)}
        {data && selectedNick && (
          <>
            <form className="searchParams">
              <input
                type="radio"
                checked={viewMode === 'grid'}
                id="gridviewcontrol"
                onChange={() => dispatch(controls.actions.viewModeChanged('grid'))}
              />
              {' '}
              <label htmlFor="gridviewcontrol">grid view</label>
              {' '}
              <input
                type="radio"
                checked={viewMode === 'list'}
                id="listviewcontrol"
                onChange={() => dispatch(controls.actions.viewModeChanged('list'))}
              />
              {' '}
              <label htmlFor="listviewcontrol">list view</label>
              {' '}
              {selectedCategories.length > 0 && (
                <>
                  <input
                    type="checkbox"
                    checked={showAll}
                    id="showallviewcontrol"
                    onChange={() => dispatch(controls.actions.showAllChanged())}
                  />
                  {' '}
                  <label htmlFor="showallviewcontrol">show all categories</label>
                </>
              )
            }
            </form>
          </>
        )}
      </div>
      {loading
        ? (
          <>
            Loading...
            <Loader active inline="centered" />
          </>
        )
        : (
          displayList.map(([k, v]) => (
            <div className={`entry ${k}`} key={k}>
              <h2>{k}</h2>
              <ul>
                {v instanceof Array ? v.map((x, i) => <li key={`${x}_${i}`}>{makeEmbeddable(x)}</li>)
                : k === 'lastfm' ? makeEmbeddable(`https://last.fm/user/${v}`)
                : v}
              </ul>
            </div>
          ))
        )}
    </div>
  )
}
