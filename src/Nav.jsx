import React from 'react'
import {
  pipe,
  map,
  flatten,
  countBy,
  sortWith,
  descend,
  omit,
  identity as id,
} from 'ramda'
import { Menu, Label } from 'semantic-ui-react'
import Iconify from './Iconify'

const categories = pipe(
  Object.values,
  map(Object.keys),
  flatten,
  countBy(id),
  omit(['last_seen', 'deadsince']),
  Object.entries,
  sortWith([descend(([, v]) => v)]),
)

const Nav = ({ data, activeCategory, selectCategory }) => (
  <Menu pointing compact className="nav">
    {[['all', Object.keys(data).length]]
      .concat(categories(data))
      .map(([k, c]) => (
        <Menu.Item
          key={k}
          onClick={selectCategory(k)}
          active={activeCategory === k}
        >
          {k !== 'all' && <Iconify icon={k} size="1x" />}
          {k}
          <Label>{c}</Label>
        </Menu.Item>
      ))}
  </Menu>
)

export default Nav
