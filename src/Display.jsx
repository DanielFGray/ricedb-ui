import React, { useContext } from 'react'
import {
  Segment,
  Modal,
  Image,
} from 'semantic-ui-react'
import ago from 's-ago'
import { ctx } from './index'
import { type } from 'ramda'

const makeEmbeddable = x => {
  if (/\.(png|jpe?g|gif)$/.test(x)) {
    const link = (
      <a
        href={x}
        target="__blank"
        rel="noopener noreferrer"
        onClick={e => e.preventDefault()}
      >
        <Image src={x} alt={x} />
      </a>
    )
    return (
      <Modal basic trigger={link}>
        <Modal.Content>
          {link}
        </Modal.Content>
      </Modal>
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

const niceDate = (timestamp, label) => {
  if (!timestamp) return null
  const d = new Date(timestamp * 1000)
  return (
    <div>{label}: {ago(d)} {d.toLocaleString()}</div>
  )
}

const Display = ({ name }) => {
  const { data, loading } = useContext(ctx)
  const { deadsince, last_seen, ...userData } = data[name] || {}
  return (
    <Segment className="displayarea" loading={loading}>
      <Segment vertical>
        <h2>{name}</h2>
        {niceDate(last_seen, 'last seen')}
        {niceDate(deadsince, 'dead since')}
      </Segment>
      {Object.entries(userData).map(([k, v]) => (
        <Segment vertical className={`entry ${k}`} key={k}>
          <h3>{k}</h3>
          <ul>
            {type(v) === 'Array' ? v.map(x => <li key={x}>{makeEmbeddable(x)}</li>)
              : k === 'lastfm' ? makeEmbeddable(`https://last.fm/user/${v}`)
              : v}
            </ul>
        </Segment>
      ))}
    </Segment>
  )
}

export default Display
