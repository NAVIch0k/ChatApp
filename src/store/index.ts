import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from './localStorage'
import todosReducer from './todosSlice'

const preloadedState = loadState()

const rootReducer = combineReducers({
  todos: todosReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})

store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  })
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
