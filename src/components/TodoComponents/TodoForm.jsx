import React, { useContext, useEffect } from 'react';

import { TodosContext } from '../../providers/TodosProvider';

import './Todo.css';

const TodoForm = props => {
  const {
    todos,
    currentTodoInput,
    handleKeyDown,
    handleChange,
    handleClick
  } = useContext(TodosContext);
  useEffect(() => localStorage.setItem('todos', JSON.stringify(todos)));

  return (
    <div className='todo-form'>
      <h2 className='todo-form-header'>New Todo:</h2>
      <form className='todo-form-container'>
        <textarea
          className='todo-form-input'
          placeholder='Enter a task to do....'
          name='setCurrentTodoInput'
          value={currentTodoInput}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <button
          className='todo-add-button'
          name='todo-add'
          onClick={handleClick}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
