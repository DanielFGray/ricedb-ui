import React, { useState } from 'react'
import Nav from './Nav'

import UserList from './Users'
import Display from './Display'

const has = (k, o) => Object.prototype.hasOwnProperty.call(o, k)

const Main = ({ data }) => {
  const [user, userChange] = useState(null)
  const [category, categoryChange] = useState('all')

  const selectUser = user => () => {
    userChange(user)
  }

  const selectCategory = category => () => {
    categoryChange(category)
  }

  const userList = category !== 'all'
    ? Object.entries(data)
        .filter(([, value]) => has(category, value))
        .reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {})
    : data
  return (
    <div className="wrapper">
      <Nav
        data={data}
        activeCategory={category}
        selectCategory={selectCategory}
      />
      <div class="displayarea">
        {user &&
          Display({
            category,
            name: user,
            ...data[user],
          })}
      </div>
      <UserList data={userList} selectUser={selectUser} />
    </div>
  )
}

export default Main
