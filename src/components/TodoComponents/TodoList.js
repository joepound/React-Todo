import React from 'react';

import './Todo.css';

import Todo from './Todo';

const TodoList = props => {
  return (
    <React.Fragment>
      <div className="todos-completed">
        {`Tasks completed: ${props.todoList.filter(todo => todo.completed).length} / ${props.todoList.length}`}
      </div>
      <input
        className="todo-search" 
        type="search" 
        placeholder="Search for todos...." 
        name="searchQuery" 
        onChange={props.handleChange}/>
      <button 
        className="todo-remove-completed-btn" 
        name="remove-completed-todos" 
        onClick={props.handleClick}>
        Remove Completed Todos
      </button>
      <div className="todo-list">
        {props.todoList.map((todoItem, i) => (
          <Todo 
            key={i}
            id={todoItem._id}
            dateCreated={todoItem.dateCreated}
            todoDetails={todoItem.task}
            isCompleted={todoItem.completed}
            handleClick={props.handleClick}/>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TodoList;