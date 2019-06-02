import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import GetJson from './GetJson'
import Main from './Main'
import 'semantic-ui-css/semantic.min.css'
import './style.css'

export const ctx = React.createContext(null)

const Index = () => {
  const [{ data: res, loading, error }, refetch] = GetJson(
    'https://ricedb.api.revthefox.co.uk/',
  )
  const data = res || {}

  const userList = useMemo(() => {
    const actives = Object.keys(data)
      .filter(name => {
        const { last_seen, deadsince, ...rest } = data[name]
        return Object.keys(rest).length > 0
      })
    return actives.reverse()
  }, [data])

  const categories = useMemo(() => {
    const withDupes = Object.values(data)
      .reduce((p, c) => {
        const { deadsince, last_seen, ...withoutTimes } = c
        return p.concat(Object.keys(withoutTimes))
      }, [])
    return [...new Set(withDupes)]
      .map(key => ({ key, value: key, text: key }))
  }, [data])

  return (
    <ctx.Provider
      value={{
        data,
        loading,
        error,
        categories,
        userList,
        refetch,
      }}
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={Main}
          />
          <Route
            exact
            path="/:name"
            component={Main}
          />
        </Switch>
      </Router>
    </ctx.Provider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const root =  document.getElementById('root')
  const render = C => ReactDOM.render(<C />, root)
  render(Index)
})
