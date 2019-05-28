import React from 'react'
import Nav from './Nav'

import UserList from './Users'
import Display from './Display'

export const Stringify = ({ className, style, ...data }) => (
  <pre className={className} style={style}>
    {JSON.stringify(data, null, 2)}
  </pre>
)

const has = (k, o) => Object.prototype.hasOwnProperty.call(o, k)

export default class Main extends React.Component {
  state = {
    user: null,
    category: 'all',
  }

  selectUser = user => () => {
    this.setState({ user })
  }

  selectCategory = category => () => {
    this.setState({ category })
  }

  render() {
    const { data } = this.props
    const { category } = this.state
    const userList =
      this.state.category !== 'all'
        ? Object.entries(data)
            .filter(([, value]) => has(category, value))
            .reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {})
        : data
    return (
      <div className="wrapper">
        <Nav
          data={data}
          activeCategory={category}
          selectCategory={this.selectCategory}
        />
        <div class="displayarea">
          {this.state.user &&
            Display({
              category,
              name: this.state.user,
              ...data[this.state.user],
            })}
        </div>
        <UserList data={userList} selectUser={this.selectUser} />
      </div>
    )
  }
}
