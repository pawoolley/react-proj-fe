import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { List } from './listsModel'
import { getLists as getListsAPI, saveList as saveListAPI } from './listsService'

export const getLists = createAsyncThunk('lists/getLists', getListsAPI)

export const saveList = createAsyncThunk(
  'lists/saveList',
  // Save the list back to the BE, then reload the lists
  (list: List, thunkAPI) => saveListAPI(list).then(() => thunkAPI.dispatch(getLists()))
)

export interface FetchState {
  isLoading: boolean
  error: any
}

export interface ListsState {
  lists: List[]
  selectedListId: string | undefined
  fetchState: FetchState
}

const initialState: ListsState = {
  lists: [],
  selectedListId: undefined,
  fetchState: {
    isLoading: false,
    error: undefined,
  },
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    selectListId: (state, action: PayloadAction<string>) => {
      state.selectedListId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLists.pending, (state) => {
      updateState(state, true, undefined, [])
    })
    builder.addCase(getLists.fulfilled, (state, action) => {
      updateState(state, false, undefined, action.payload)
    })
    builder.addCase(getLists.rejected, (state, action) => {
      updateState(state, false, action.error, [])
    })
  },
})

export const { selectListId } = listsSlice.actions

const updateState = (state: ListsState, isLoading: boolean, error: any, lists: List[]) => {
  state.lists = lists
  state.fetchState = {
    isLoading,
    error,
  }
}

export const selectLists = (state: RootState) => state.lists.lists
export const selectFetchState = (state: RootState) => state.lists.fetchState
export const selectSelectedListId = (state: RootState) => state.lists.selectedListId

export default listsSlice.reducer
