import React, {useCallback, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Message, Icon } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from './store'
import Controls from './Controls'
import Display from './Display'
import fetchUsers from './fetchUsers'

export default function Main({ match, history }: RouteComponentProps<{ nick?: string }>) {
  const dispatch = useDispatch()
  const { error } = useSelector((state: RootState) => state.users)
  const name = match.params.nick ?? ''

  const changeUser = useCallback((user: string) => {
    history.push(`/${user}`)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) console.error(error)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

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
