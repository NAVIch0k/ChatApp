import React from 'react'
import styles from './App.module.scss'
import Todo from './components/Todo/Todo'

const App: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Todo />
      </div>
    </div>
  )
}

export default App
