import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dropdown,
  Input,
  Label,
  Menu,
  Popup,
} from 'semantic-ui-react'
import { has } from 'ramda'
import Iconify from './Iconify'
import { withoutTimes, Contains } from './utils'
import { userListSelector, RootState, categoriesSelector, fetchData } from './store'
import { RiceDbEntry } from './react-app-env.d'

const User = ({
  active: _a,
  nick,
  data,
}: {
  nick: string;
  active: string;
  data: RiceDbEntry;
}) => (
  <Menu.Item key={nick} as={Link} to={`/${nick}`}>
    {nick}
    {data && Object.entries(withoutTimes(data)).map(([k, v]) => {
      const content = v instanceof Array ? `${v.length} ${k}` : k
      return (
        <Popup
          content={content}
          trigger={(
            <Label size="tiny" key={k}>
              <Iconify icon={k} size="1x" />
            </Label>
          )}
        />
      )
    })}
  </Menu.Item>
)
interface Controls {
  selectedNick: string;
  changeUser: (user: string) => void;
}
export default function Controls({ selectedNick, changeUser }: Controls) {
  const [input, inputChanged] = useState('')
  const [selectedCategories, categoriesChanged] = useState<string[]>([])
  const inputRef = useRef<Input>(null)
  const { data, loading } = useSelector((state: RootState) => state.ricedb)
  const userList = useSelector(userListSelector)
  const categories = useSelector(categoriesSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (! data) {
      dispatch(fetchData())
    }
  }, [dispatch, data])

  let list = userList
  if (input !== '') {
    list = list.filter(n => Contains(input, n))
  }
  if (selectedCategories.length > 0) {
    list = list.filter(n => selectedCategories.every(c => data && has(c, data[n])))
  }

  useEffect(() => {
    if (list.length === 1 && selectedNick !== list[0]) {
      changeUser(list[0])
    }
  }, [list, changeUser, selectedNick])

  useEffect(() => inputRef.current?.focus(), [])

  return (
    <div className="userlist">
      <Input
        value={input}
        ref={inputRef}
        disabled={loading}
        onChange={(_, { value }) => inputChanged(value)}
        onKeyPress={(e: KeyboardEvent<Input>) => {
          if (e.key === 'Enter') {
            changeUser(list[0])
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
      <Menu vertical fluid secondarvaluey className="nicklist">
        {data && list.map(n => (
          <User
            key={n}
            active={selectedNick}
            nick={n}
            data={data[n]}
          />
        ))}
      </Menu>
    </div>
  )
}
