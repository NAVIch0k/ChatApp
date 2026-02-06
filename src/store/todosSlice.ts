import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export type FilterType = 'all' | 'active' | 'completed'

export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type TodosState = {
  items: Todo[]
  filter: FilterType
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.unshift(action.payload)
      },
      prepare(title: string) {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            completed: false,
            createdAt: Date.now(),
          } satisfies Todo,
        }
      },
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    editTodo(state, action: PayloadAction<{ id: string; title: string }>) {
      const todo = state.items.find((item) => item.id === action.payload.id)
      if (todo) todo.title = action.payload.title.trim()
    },
    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload
    },
    reorderTodos(state, action: PayloadAction<{ activeId: string; overId: string }>) {
      const { activeId, overId } = action.payload
      const activeIndex = state.items.findIndex((i) => i.id === activeId)
      const overIndex = state.items.findIndex((i) => i.id === overId)
      if (activeIndex === -1 || overIndex === -1) return
      const [moved] = state.items.splice(activeIndex, 1)
      state.items.splice(overIndex, 0, moved)
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter, reorderTodos } =
  todosSlice.actions

export default todosSlice.reducer
