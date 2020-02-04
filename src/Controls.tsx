import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, Input, Menu } from 'semantic-ui-react'
import { FixedSizeList as List } from 'react-window'
import { has } from 'ramda'
import { userListSelector, RootState, categoriesSelector, fetchData } from './store'
import { Contains } from './utils'

export default function Controls({
  selectedNick,
  changeUser,
}: {
  selectedNick: string;
  changeUser: (user: string) => void;
}) {
  const { data, loading } = useSelector((state: RootState) => state.ricedb)
  const [input, inputChanged] = useState('')
  const [selectedCategories, categoriesChanged] = useState<string[]>([])
  const inputRef = useRef<Input>(null)
  const userList = useSelector(userListSelector)
  const categories = useSelector(categoriesSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (! data) {
      dispatch(fetchData())
    }
  }, [dispatch, data])

  const list = userList
    .filter(({ nick, ...userData }) => {
      if (input !== '' && ! Contains(input, nick)) {
        return false
      }
      if (
        selectedCategories.length > 0
        && ! selectedCategories.every(c => data && has(c, userData))
      ) {
        return false
      }
      return true
    })

  useEffect(() => {
    if (list.length === 1 && selectedNick !== list[0].nick) {
      changeUser(list[0].nick)
    }
  }, [list, changeUser, selectedNick])

  useEffect(() => inputRef.current?.focus(), [])

  return (
    <div className="controls">
      <Input
        value={input}
        ref={inputRef}
        disabled={loading}
        onChange={(_, { value }) => inputChanged(value)}
        onKeyPress={(e: KeyboardEvent<Input>) => {
          if (e.key === 'Enter') {
            changeUser(list[0].nick)
          }
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
        value={selectedCategories}
        onChange={(_, { value }) => {
          if (value == null) {
            categoriesChanged([])
          } else {
            // @ts-ignore
            categoriesChanged(value)
          }
        }}
      />
      <Menu className="nicklist">
        <List
          itemCount={list?.length ?? 0}
          itemSize={40}
          width="100%"
          height={window.screen.availHeight - 185}
        >
          {({ style, index }) => {
            if (! data) return null
            const userData = list[index]
            return (
              <Menu.Item key={userData.nick} as={Link} to={`/${userData.nick}`} style={style}>
                {userData.nick}
              </Menu.Item>
            )
          }}
        </List>
      </Menu>
    </div>
  )
}
