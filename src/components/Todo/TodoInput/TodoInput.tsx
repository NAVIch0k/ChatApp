import React, { useState } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { addTodo } from '../../../store/todosSlice'
import styles from './TodoInput.module.scss'

const TodoInput: React.FC = () => {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    dispatch(addTodo(trimmed))
    setValue('')
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <input
        className={styles.input}
        placeholder="Добавьте новую задачу..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  )
}

export default TodoInput
