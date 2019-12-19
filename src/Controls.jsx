import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  Input,
  Menu,
  Segment,
  Dropdown,
} from 'semantic-ui-react'
import { ctx } from './index'
import User from './User'

const has = obj => Object.prototype.hasOwnProperty.bind(obj)
const kontains = b => a => a.toLowerCase().includes(b.toLowerCase())

const Controls = ({ name, changeUser }) => {
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
    <Segment className="userlist">
      <Input
        value={input}
        ref={inputRef}
        disabled={loading}
        onChange={(_, { value }) => input$(value)}
        onKeyPress={e => {
          if (e.key === 'Enter') changeUser(list[0])
        }}
        placeholder="Search"
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
    </Segment>
  )
}

export default Controls
