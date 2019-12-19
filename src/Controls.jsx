import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { memoizeWith } from 'ramda'
import {
  Dropdown,
  Input,
  Label,
  Menu,
  Popup,
} from 'semantic-ui-react'
import Iconify from './Iconify'
import ctx from './ctx'

const withoutTimes = ({ last_seen: _, deadsince, ...x }) => x

const User = memoizeWith(x => x.name, ({ name, userData }) => (
  <Menu.Item key={name} as={Link} to={`/${name}`}>
    {name}
    {Object.keys(withoutTimes(userData)).map(i => {
      const content = userData[i].map
        ? `${userData[i].length} ${i}`
        : i
      return (
        <Popup
          content={content}
          trigger={
            <Label size="tiny" key={i}>
              <Iconify icon={i} size="1x" />
            </Label>
          }
        />
      )
    })}
  </Menu.Item>
))

const has = obj => Object.prototype.hasOwnProperty.bind(obj)
const kontains = b => a => a.toLowerCase().includes(b.toLowerCase())

export default function Controls({ name, changeUser }) {
  const [input, input$] = useState('')
  const [cats, cats$] = useState([])
  const inputRef = useRef(null)
  const { data, loading, categories, userList } = useContext(ctx)

  let list = userList
  if (input !== '')
    list = list.filter(kontains(input))
  if (cats.length > 0)
    list = list.filter(n => cats.every(has(data[n])))

  useEffect(() => {
    if (list.length === 1 && name !== list[0]) {
      changeUser(list[0])
    }
  }, [list, changeUser, name])

  useEffect(() => inputRef.current.focus(), [])

  return (
    <div className="userlist">
      <Input
        value={input}
        ref={inputRef}
        disabled={loading}
        onChange={(_, { value }) => input$(value)}
        onKeyPress={e => {
          if (e.key === 'Enter') changeUser(list[0])
        }}
        placeholder="Search"
        clearable
        fluid
      />
      <Dropdown
        fluid
        multiple
        selection
        clearable
        search
        placeholder="Filter by categories"
        disabled={loading}
        options={categories}
        value={cats}
        onChange={(_, { value }) => cats$(value)}
      />
      <Menu
        vertical
        fluid
        secondary
        className="nicklist"
      >
        {list.map(n => (
          <User
            key={n}
            name={n}
            active={name}
            userData={data[n]}
          />
        ))}
      </Menu>
    </div>
  )
}
