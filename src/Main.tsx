import React, { useEffect, ReactChildren } from 'react'
import { Message, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from './store'
import Controls from './Controls'
import Display from './Display'

export default function Main({ match, history }: RouteComponentProps<{ name: string }>) {
  const error = useSelector((state: RootState) => state.ricedb.error)
  const name = match.params.name ?? ''

  useEffect(() => {
    if (error) console.error(error)
  }, [error])

  const changeUser = (user: string) => {
    history.push(`/${user}`)
  }

  return (
    <>
      {error && (
        <Message warning>
          <Icon name="warning" />
          {error.message}
        </Message>
      )}
      <div className="wrapper">
        <Controls selectedNick={name} changeUser={changeUser} />
        <Display selectedNick={name} />
      </div>
    </>
  )
}
