import React from 'react'
import ReactDOM from 'react-dom'
import GetJson from './GetJson'
import Main, { Stringify } from './Main'
import 'semantic-ui-css/semantic.min.css'
import './style.css'

const Index = () => {
  const [{ data, loading, error }] = GetJson(
    'https://ricedb.api.revthefox.co.uk/',
  )
  return (
    <>
      {loading && 'Loading'}
      {error && Stringify({ error: error.message })}
      {data ? <Main data={data} /> : ''}
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
