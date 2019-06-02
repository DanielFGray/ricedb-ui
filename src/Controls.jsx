import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  Input,
  Menu,
  Segment,
  Dropdown,
} from 'semantic-ui-react'
import { ctx } from './index'
import { has } from 'ramda'
import User from './User'

const Controls = ({ name, changeUser }) => {
  const [input, input$] = useState('')
  const [cats, cats$] = useState([])
  const inputRef = useRef(null)
  const { data, loading, categories, userList } = useContext(ctx)

  const list = React.useMemo(() => {
    let u = userList
    if (input !== '')
      u = userList.filter(n => n.toLowerCase().includes(input.toLowerCase()))
    if (cats.length > 0)
      u = userList.filter(n => cats.every(c => has(c, data[n])))
    return u
  }, [input, userList, cats, data])

  useEffect(() => {
    if (list.length === 1) {
      changeUser(list[0])
    }
  }, [list, changeUser])

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
