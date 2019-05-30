import React from 'react'
import { Embed, Modal, Image } from 'semantic-ui-react'

const type = x => Object.prototype.toString.call(x).slice(8, -1)

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

const entry = ([k, v]) => (
  <div className={`entry ${k}`} key={k}>
    <h3>{k}</h3>
    <ul>
      {type(v) === 'Array' ? v.map(x => <li key={x}>{makeEmbeddable(x)}</li>)
        : k === 'lastfm' ? makeEmbeddable(`https://last.fm/user/${v}`)
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
