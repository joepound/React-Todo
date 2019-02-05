import React, { useContext, useEffect } from 'react';

import { TodosContext } from '../../providers/TodosProvider';

import './Todo.css';

import Todo from './Todo';

const TodoList = props => {
  const { todos, queriedTodos, searchQuery, handleChange, handleClick } = useContext(
    TodosContext
  );
  useEffect(() => localStorage.setItem('todos', JSON.stringify(todos)));

  return (
    <>
      <div className='todos-completed'>
        {`Tasks completed: ${
          queriedTodos.filter(todo => todo.completed).length
        } / ${queriedTodos.length}`}
      </div>
      <input
        className='todo-search'
        type='search'
        placeholder='Search for todos....'
        name='setSearchQuery'
        value={searchQuery}
        onChange={handleChange}
      />
      <button
        className='todo-remove-completed-btn'
        name='remove-completed-todos'
        onClick={handleClick}
      >
        Remove Completed Todos
      </button>
      <div className='todo-list'>
        {queriedTodos.map((todoItem, i) => (
          <Todo
            key={i}
            id={todoItem._id}
            dateCreated={todoItem.dateCreated}
            todoDetails={todoItem.task}
            isCompleted={todoItem.completed}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
