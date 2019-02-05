import React from 'react';

import './App.css';

import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoComponents/TodoForm';

function App() {
  return (
    <div className='todo-app'>
      <h1 className='todo-main-header'>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
