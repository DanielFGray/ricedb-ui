import React from 'react'
import Iconify from './Iconify'
import { List, Segment, LabelGroup, Label } from 'semantic-ui-react'
import { pipe, omit } from 'ramda'

const categories = pipe(
  omit(['last_seen', 'deadsince']),
  Object.keys,
)

const User = ({ name, data, selectUser }) => (
  <List.Item key={name} onClick={selectUser(name)}>
    {name}
    {/*<List.Content floated="right">
      <LabelGroup size="tiny">
        {categories(data).map(i => (
          <Label as="svg" key={i}>
            <Iconify icon={i} size="1x" />
          </Label>
        ))}
      </LabelGroup>
        </List.Content>*/}
  </List.Item>
)

const Users = ({ data, selectUser }) => (
  <Segment className="userlist">
    <List selection compact>
      {Object.keys(data).map(name =>
        User({ name, data: data[name], selectUser }),
      )}
    </List>
  </Segment>
)

export default Users