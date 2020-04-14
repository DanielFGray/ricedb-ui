import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { sort, descend, has } from 'ramda'
import { withoutMeta } from './utils'
import type { User } from './react-app-env.d'
import type { RootState } from './store'

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  const response = await fetch('https://ricedb.api.revthefox.co.uk/')
  return response.json()
})

const usersAdapter = createEntityAdapter<User>({
  selectId: x => x.nick,
  sortComparer: sort<User>(descend(x => x.last_seen)),
})

/* eslint-disable no-param-reassign */
export const remoteData = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: build => {
    build.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload)
    })
    build.addCase(fetchUsers.rejected, (state, action) => {
      state.errors = action.payload
    })
  },
})

export default remoteData

export const userSelectors = usersAdapter.getSelectors(
  (state: RootState) => state.users,
)

export const categoriesSelector = createSelector([userSelectors.selectAll], data => {
  if (! data) return []
  const withDupes = data.flatMap(c => Object.keys(withoutMeta(c)))
  return Array.from(new Set(withDupes)).map(key => ({ key, value: key, text: key }))
})

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }
