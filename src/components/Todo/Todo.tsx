import React from 'react'
import { useAppSelector } from '../../store/hooks'
import FilterBar from './FilterBar/FilterBar'
import styles from './Todo.module.scss'
import TodoInput from './TodoInput/TodoInput'
import TodoList from './TodoList/TodoList'

const Todo: React.FC = () => {
  const items = useAppSelector((state) => state.todos.items)
  const filter = useAppSelector((state) => state.todos.filter)
  const total = items.length
  const completed = items.filter((i) => i.completed).length

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h1 className={styles.title}>Todo List</h1>
        <p className={styles.subtitle}>
          Управляйте задачами, меняйте порядок перетаскиванием и храните данные в
          браузере.
        </p>
        <div className={styles.stats}>
          <span>
            Всего: <span className={styles.statValue}>{total}</span>
          </span>
          <span>
            Выполнено: <span className={styles.statValue}>{completed}</span>
          </span>
        </div>
      </header>
      <TodoInput />
      <FilterBar />
      <TodoList items={items} filter={filter} />
    </div>
  )
}

export default Todo
