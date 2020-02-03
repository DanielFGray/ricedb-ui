import React from 'react'
import { RiceDbEntry } from './react-app-env.d'

export const withoutTimes = ({ last_seen: _l, deadsince: _d, ...x }: RiceDbEntry) => x
export const Contains = (a: string, b: string) => b.toLowerCase().includes(a.toLowerCase())

type token = {
  type: string;
  value: string;
}

/* blame greenjello on freenode for this */
export const urlTokens = (str: string) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  const tokens: token[] = []
  let last = 0
  if (! str) return tokens
  str.replace(regex, (m, ...args) => {
    const index = args[args.length - 2]
    tokens.push({
      type: 'string',
      value: str.slice(last, index),
    })
    tokens.push({
      type: 'url',
      value: m,
    })
    last = index + m.length
    return ''
  })
  tokens.push({
    type: 'string',
    value: str.slice(last),
  })
  return tokens
}

export const Linkify = (text: string) => urlTokens(text).map((t, i) => {
  switch (t.type) {
  case 'url':
    return (
      <a
        key={i /* eslint-disable-line react/no-array-index-key */}
        href={t.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.value}
      </a>
    )
  case 'string':
    return <>{t.value}</>
  default:
    throw new Error('unknown linkify token')
  }
})
