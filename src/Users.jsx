import React from 'react'
import { List, Segment, LabelGroup, Label } from 'semantic-ui-react'
import Iconify from './Iconify'

const categories = ({ last_seen, deadsince, ...x }) => Object.keys(x)

const User = ({ name, data, selectUser }) => (
  <List.Item key={name} onClick={selectUser(name)}>
    {name}
    <List.Content floated="right">
      <LabelGroup>
        {categories(data).map(i => (
          <Label size="tiny" key={i}>
            <Iconify icon={i} size="1x" />
          </Label>
        ))}
      </LabelGroup>
    </List.Content>
  </List.Item>
)

const UserList = ({ data, selectUser }) =>
  (
  <Segment className="userlist">
    <List selection compact>
      {Object.keys(data)
        .map(name => User({ name, data: data[name], selectUser }))}
    </List>
  </Segment>
)

export default UserList
