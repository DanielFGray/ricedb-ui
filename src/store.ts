import {
  createSelector,
  createSlice,
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit'
import { descend } from 'ramda'
import { withoutTimes } from './utils'
import { RiceDbEntry, RiceDb } from './react-app-env.d'

/* eslint-disable no-param-reassign */
export const remoteSlice = createSlice({
  name: 'ricedb',
  initialState: {
    data: null as RiceDb | null,
    loading: false,
    error: null as Error | null,
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true
    },
    fetchResolved(state, action: { payload: RiceDb }) {
      state.loading = false
      // normalize
      state.data = action.payload
    },
    fetchFailed(state, action: { payload: Error }) {
      state.loading = false
      state.error = action.payload
    },
  },
})
/* eslint-enable no-param-reassign */

export const reducer = combineReducers({
  ricedb: remoteSlice.reducer,
})
export type RootState = ReturnType<typeof reducer>

export const store = configureStore({
  reducer,
})
export type AppDispatch = typeof store.dispatch

const selectData = (state: RootState) => state.ricedb.data

export const userListSelector = createSelector([selectData], data => {
  if (! data) return []
  return Object.keys(data)
    .filter(nick => Object.entries(withoutTimes(data[nick])).length > 0)
    .sort(descend(x => data[x].last_seen))
})

export const categoriesSelector = createSelector([selectData], data => {
  if (! data) return []
  const withDupes = Object.values(data).flatMap((c: RiceDbEntry) => Object.keys(withoutTimes(c)))
  return Array.from(new Set(withDupes))
    .map(key => ({ key, value: key, text: key }))
})

export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(remoteSlice.actions.fetchStarted())
  try {
    const res = await fetch('https://ricedb.api.revthefox.co.uk/')
    const json = await res.json()
    if (typeof json !== 'object') throw new Error('unrecognized response, not an object')
    dispatch(remoteSlice.actions.fetchResolved(json))
  } catch (e) {
    dispatch(remoteSlice.actions.fetchFailed(e))
  }
}

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }
