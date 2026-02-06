import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { Todo, deleteTodo, editTodo, toggleTodo } from '../../../store/todosSlice'
import styles from './TodoItem.module.scss'

interface TodoItemProps {
  item: Todo
}

const TodoItem = ({ item }: TodoItemProps) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(item.title)

  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition],
  )

  useEffect(() => {
    setDraft(item.title)
  }, [item.title])

  const commitEdit = () => {
    const trimmed = draft.trim()
    if (trimmed.length === 0) {
      setDraft(item.title)
      setIsEditing(false)
      return
    }
    dispatch(editTodo({ id: item.id, title: trimmed }))
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setDraft(item.title)
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
    >
      <div
        ref={setActivatorNodeRef}
        className={styles.handle}
        {...attributes}
        {...listeners}
      >
        <span className={styles.srOnly}>Перетащить</span>
        <div className={styles.handleDots} />
      </div>

      <button
        onClick={() => dispatch(toggleTodo(item.id))}
        className={`${styles.checkbox} ${item.completed ? styles.checked : ''}`}
      >
        {item.completed && '✓'}
      </button>

      <div className={styles.content}>
        {isEditing ? (
          <input
            className={styles.input}
            autoFocus
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitEdit}
            onKeyDown={(event) => {
              if (event.key === 'Enter') commitEdit()
              if (event.key === 'Escape') cancelEdit()
            }}
          />
        ) : (
          <button
            onDoubleClick={() => setIsEditing(true)}
            className={`${styles.title} ${item.completed ? styles.completed : ''}`}
          >
            {item.title}
          </button>
        )}
      </div>

      <div className={styles.actions}>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className={styles.action}>
            Редактировать
          </button>
        )}
        <button onClick={() => dispatch(deleteTodo(item.id))} className={styles.delete}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default TodoItem
