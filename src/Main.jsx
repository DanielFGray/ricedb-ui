import React, { useEffect, useContext } from 'react'
import { Message, Icon } from 'semantic-ui-react'
import ctx from './ctx'

import Controls from './Controls'
import Display from './Display'

export default function Main({ match, history }) {
  const { error } = useContext(ctx)
  const name = match.params.name || ""

  useEffect(() => {
    if (error)
      console.error(error)
  }, [error])

  const changeUser = user => {
    history.push(`/${user}`)
  }

  return (
    <>
      {error && (
        <Message warning>
          <Icon name="warning" />{error.message}
        </Message>
      )}
      <div className="wrapper">
        <Display name={name} />
        <Controls name={name} changeUser={changeUser} />
      </div>
    </>
  )
}
