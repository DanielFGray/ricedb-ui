import React from 'react'
import { Menu } from 'semantic-ui-react'
// import { Menu, Label } from 'semantic-ui-react'
// import Iconify from './Iconify'

const categories = data =>
  [...new Set(
    Object.values(data)
      .reduce((p, { last_seen, deadsince, ...c }) => p.concat(Object.keys(c)), [])
  )]

const Nav = ({ data, activeCategory, selectCategory }) => (
  <Menu pointing compact className="nav">
    {['all'].concat(categories(data))
      .map(c => (
        <Menu.Item
          key={c}
          onClick={selectCategory(c)}
          active={activeCategory === c}
        >
          {c}
          {/*k !== 'all' && <Label as="svg"><Iconify icon={k} size="1x" /></Label>*/}
        </Menu.Item>
      ))}
  </Menu>
)

export default Nav
