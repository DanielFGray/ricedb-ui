import React from 'react'
import ReactDOM from 'react-dom'
import GetJson from './GetJson'
import Main from './Main'
import { Message, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './style.css'

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
