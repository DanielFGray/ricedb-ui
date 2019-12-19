import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import GetJson from './GetJson'
import Main from './Main'
import 'semantic-ui-css/semantic.min.css'
import ctx from './ctx'
import './style.css'

const Index = () => {
  const [{ data: res, loading, error }, refetch] = GetJson(
    'https://ricedb.api.revthefox.co.uk/',
  )
  const data = res || {}

  const stripMeta = ({ last_seen, deadsince, ...rest }) => rest

  const userList = useMemo(() => {
    const actives = Object.keys(data)
      .filter(name => Object.keys(stripMeta(data[name])).length > 0)
    return actives.reverse()
  }, [data])

  const categories = useMemo(() => {
    const withDupes = Object.values(data)
      .flatMap(c => Object.keys(stripMeta(c)))
    return Array.from(new Set(withDupes))
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
