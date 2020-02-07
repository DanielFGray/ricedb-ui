import React, { useCallback } from 'react'
import { Message, Icon } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from './store'
import Controls from './Controls'
import Display from './Display'

export default function Main({ match, history }: RouteComponentProps<{ nick?: string }>) {
  const { error } = useSelector((state: RootState) => state.ricedb)
  const name = match.params.nick ?? ''

  const changeUser = useCallback((user: string) => {
    history.push(`/${user}`)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) console.error(error)

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
