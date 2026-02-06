import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { FilterType, setFilter } from '../../../store/todosSlice'
import styles from './FilterBar.module.scss'

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const active: FilterType = useAppSelector((state) => state.todos.filter)

  return (
    <div className={styles.bar}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => dispatch(setFilter(filter.value))}
          className={active === filter.value ? styles.activeButton : styles.button}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
