import { createSlice } from '@reduxjs/toolkit'

const ControlsSlice = createSlice({
  name: 'controls',
  initialState: {
    selectedCategories: [] as string[],
    showAll: true,
    viewMode: 'grid' as 'grid' | 'list',
    searchTarget: 'nick' as 'nick' | 'distro',
  },
  reducers: {
    searchTargetChanged(state, action) {
      state.searchTarget = action.payload
    },
    viewModeChanged(state, action) {
      state.viewMode = action.payload
    },
    showAllChanged(state) {
      state.showAll = ! state.showAll
    },
    categoriesChanged(state, action: { payload: string[] }) {
      if (action.payload.length === 0 && state.showAll === false) {
        state.showAll = true
      }
      state.selectedCategories = action.payload
    },
  },
})
export default ControlsSlice
