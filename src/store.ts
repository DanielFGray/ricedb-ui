import { createSelector, createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'
import { has } from 'ramda'
import { withoutMeta } from './utils'
import { RiceDb } from './react-app-env.d'

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
  return data.filter(x => Object.keys(withoutMeta(x)).length > 0)
})

export const categoriesSelector = createSelector([selectData], data => {
  if (! data) return []
  const withDupes = data.flatMap(c => Object.keys(withoutMeta(c)))
  return Array.from(new Set(withDupes)).map(key => ({ key, value: key, text: key }))
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assert(condition: boolean, message?: string): asserts condition {
  if (condition !== true) throw new Error(message)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertValid(input: any): asserts input is RiceDb {
  assert(input instanceof Array, 'response not an array')
  assert(input.every(has('nick')), 'every row does not have a nick')
}

export const fetchData = () => async (dispatch: AppDispatch) => {
  dispatch(remoteSlice.actions.fetchStarted())
  try {
    const res = await fetch('https://ricedb.api.revthefox.co.uk/')
    const json = await res.json()
    assertValid(json)
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
