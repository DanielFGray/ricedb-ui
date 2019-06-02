import React from 'react'
import { Link } from 'react-router-dom'
import {
  Popup,
  Label,
  Menu,
} from 'semantic-ui-react'
import Iconify from './Iconify'
import { memoizeWith } from 'ramda'

export const withoutTimes = ({ last_seen, deadsince, ...x }) => x

const User = memoizeWith(x => x.name, ({ name, userData }) => (
  <Menu.Item as={Link} to={`/${name}`}>
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

export default User
