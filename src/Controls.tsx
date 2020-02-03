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
  Popup,
  Menu,
} from 'semantic-ui-react'
import { has, descend } from 'ramda'
import Iconify from './Iconify'
import { withoutMeta, Contains } from './utils'
import { userListSelector, RootState, categoriesSelector, fetchData } from './store'
import { RiceDbEntry } from './react-app-env.d'

const User = React.memo(({
  data,
  active: _a,
}: {
  active: string;
  data: RiceDbEntry;
}) => (
  <Menu.Item key={data.nick} as={Link} to={`/${data.nick}`}>
    {data.nick}
    {data && Object.entries(withoutMeta(data)).map(([k, v]) => {
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
))

export default function Controls({ selectedNick, changeUser }: {
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

  const list = userList.filter(({ nick, ...userData }) => {
    if (input !== '' && ! Contains(input, nick)) {
      return false
    }
    if (selectedCategories.length > 0
      && ! selectedCategories.every(c => data && has(c, userData))) {
      return false
    }
    return true
  })
    .sort(descend(x => x.last_seen))

  useEffect(() => {
    if (list.length === 1 && selectedNick !== list[0].nick) {
      changeUser(list[0].nick)
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
      <Menu vertical fluid className="nicklist">
        {data && list.map(userData => (
          <User
            key={userData.nick}
            active={selectedNick}
            data={userData}
          />
        ))}
      </Menu>
    </div>
  )
}
