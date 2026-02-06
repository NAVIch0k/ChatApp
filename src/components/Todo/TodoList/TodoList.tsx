import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import React, { useState } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import type { FilterType, Todo } from '../../../store/todosSlice'
import { reorderTodos } from '../../../store/todosSlice'
import TodoItem from '../TodoItem/TodoItem'
import styles from './TodoList.module.scss'

interface TodoListProps {
  items: Todo[]
  filter: FilterType
}

const TodoList: React.FC<TodoListProps> = ({ items, filter }) => {
  const dispatch = useAppDispatch()
  const [activeId, setActiveId] = useState<string | null>(null)

  let filtered = items
  if (filter === 'active') filtered = items.filter((i) => !i.completed)
  if (filter === 'completed') filtered = items.filter((i) => i.completed)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      dispatch(
        reorderTodos({
          activeId: String(active.id),
          overId: String(over.id),
        }),
      )
    }
    setActiveId(null)
  }
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const activeItem = activeId ? items.find((i) => i.id === activeId) : undefined

  if (filtered.length === 0) {
    return <div className={styles.empty}>Задач пока нет. Добавьте первую задачу.</div>
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={filtered.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.list}>
          {filtered.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay adjustScale={false} dropAnimation={null}>
        {activeItem ? (
          <div className={styles.overlayCard}>
            <div className={styles.overlayHandle}>
              <div className={styles.overlayDots} />
            </div>
            <div
              className={`${styles.overlayCheckbox} ${
                activeItem.completed ? styles.overlayChecked : ''
              }`}
            >
              {activeItem.completed && '✓'}
            </div>
            <div
              className={`${styles.overlayTitle} ${
                activeItem.completed ? styles.overlayCompleted : ''
              }`}
            >
              {activeItem.title}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default TodoList
