import React, { useState } from 'react'
import {
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import Nav from './Nav'

import UserList, { withoutTimes } from './Users'
import Display from './Display'

const has = (k, o) => Object.prototype.hasOwnProperty.call(o, k)

const Main = ({ data, refetch, loading }) => {
  const [user, selectUser] = useState(null)
  const [category, selectCategory] = useState('all')

  let userList = React.useMemo(() => Object.keys(data)
    .reverse()

    .filter(x => Object.keys(withoutTimes(data[x])).length > 0), [data])

  if (category !== 'all')
    userList = userList.filter(u => has(category, data[u]))

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
        {loading && (
          <Segment placeholder>
            <Dimmer active inverted>
              <Loader size="large" indeterminate>
                Loading...
              </Loader>
            </Dimmer>
          </Segment>
        )}
        {user && (
          <Display
            category={category}
            name={user}
            data={data[user]}
          />
        )}
      </div>
      <UserList
        userList={userList}
        data={data}
        selectUser={selectUser}
        activeUser={user}
      />
    </div>
  )
}

export default Main
