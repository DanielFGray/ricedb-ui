import React, { useState } from 'react'
import {
  Input,
  Label,
  LabelGroup,
  List,
  Segment,
} from 'semantic-ui-react'
import Iconify from './Iconify'

const withoutTimes = ({ last_seen, deadsince, ...x }) => x

const User = ({ name, data, selectUser }) => (
  <List.Item key={name} onClick={() => selectUser(name)}>
    {name}
    <List.Content floated="right">
      <LabelGroup>
        {Object.keys(withoutTimes(data)).map(i => (
          <Label size="tiny" key={i}>
            <Iconify icon={i} size="1x" />
          </Label>
        ))}
      </LabelGroup>
    </List.Content>
  </List.Item>
)

const UserList = ({ data, selectUser }) => {
  const [input, inputChange] = useState('')
  const list = input === ''
    ? Object.keys(data)
    : Object.keys(data)
      .filter(c => c.toLowerCase().includes(input.toLowerCase()))

  if (list.length === 1)
    selectUser(list[0])

  return (
    <Segment className="userlist">
      <Input
        value={input}
        onChange={e => inputChange(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter')
            selectUser(list[0])
        }}
        placeholder="Search"
        fluid
      />
      <List selection compact className="nicklist">
        {list.map(name => User({ name, data: data[name], selectUser }))}
      </List>
    </Segment>
  )
}

export default UserList
