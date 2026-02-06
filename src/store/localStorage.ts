import type { RootState } from './index'

const STORAGE_KEY = 'todo_state_v1'

export const loadState = (): Partial<RootState> | undefined => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) return undefined
    return JSON.parse(serialized) as Partial<RootState>
  } catch {
    return undefined
  }
}

export const saveState = (state: Partial<RootState>): void => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serialized)
  } catch {
    // Ignore write errors
  }
}
