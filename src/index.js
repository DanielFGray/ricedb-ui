import React from 'react'
import ReactDOM from 'react-dom'
import GetJson from './GetJson'
import Main from './Main'
import 'semantic-ui-css/semantic.min.css'
import './style.css'
import { Message, Icon, Segment } from 'semantic-ui-react'

const Index = () => {
  const [{ data, loading, error }, refetch] = GetJson(
    'https://ricedb.api.revthefox.co.uk/',
  )
  return (
    <>
      {error && <Message warning><Icon name="warning" />{error.message}</Message>}
      <Main
        data={data || {}}
        loading={loading}
        refetch={refetch}
      />
    </>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
