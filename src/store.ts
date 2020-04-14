import { configureStore, combineReducers } from '@reduxjs/toolkit'
import Controls from './Controls/slice'
import fetchUsers from './fetchUsers'

export const reducer = combineReducers({
  users: fetchUsers.reducer,
  controls: Controls.reducer,
})

export type RootState = ReturnType<typeof reducer>

export const store = configureStore({
  reducer,
})

export type AppDispatch = typeof store.dispatch
