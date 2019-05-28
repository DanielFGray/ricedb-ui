import React, { useState } from 'react'
import Nav from './Nav'

import UserList from './Users'
import Display from './Display'

const has = (k, o) => Object.prototype.hasOwnProperty.call(o, k)

const Main = ({ data, refetch, loading }) => {
  const [user, selectUser] = useState(null)
  const [category, selectCategory] = useState('all')

  const userList = category !== 'all'
    ? Object.entries(data)
      .reduce((p, [k, v]) => (
        has(category, v)
          ? Object.assign(p, { [k]: v })
          : p
      ), {})
    : data
  return (
    <div className="wrapper">
      <Nav
        data={data}
        activeCategory={category}
        selectCategory={selectCategory}
        refetch={refetch}
        loading={loading}
      />
      <div class="displayarea">
        {user &&
          Display({
            category,
            name: user,
            ...data[user],
          })}
      </div>
      <UserList data={userList} selectUser={selectUser} activeUser={user} />
    </div>
  )
}

export default Main
