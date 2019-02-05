import React, { useState, createContext } from 'react';

import Moment from 'moment';
import Fuse from 'fuse.js';

export const TodosContext = createContext();

const TodosProvider = props => {
  const randomizer = () =>
    Math.floor(Math.random() * 1000) +
    String(Date.now()) +
    Math.floor(Math.random() * 1000);

  const deepCopyJSONArray = jsonArr => jsonArr.map(json => ({ ...json }));

  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
    {
      _id: randomizer(),
      dateCreated: Moment().format('MMMM D, YYYY - LT'),
      task: 'Add some todos!',
      completed: false
    }
  ];

  const [todos, setTodos] = useState(deepCopyJSONArray(initialTodos));
  const [queriedTodos, setQueriedTodos] = useState(
    deepCopyJSONArray(initialTodos)
  );
  const [currentTodoInput, setCurrentTodoInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const todosContext = {
    todos,
    queriedTodos,
    currentTodoInput,
    setCurrentTodoInput,
    searchQuery,
    setSearchQuery,
    sample: todos,

    addTodo(e) {
      e.preventDefault();
      if (todosContext.currentTodoInput) {
        const todos = [
          ...deepCopyJSONArray(todosContext.todos),
          {
            _id: randomizer(),
            dateCreated: Moment().format('MMMM D, YYYY - LT'),
            task: todosContext.currentTodoInput,
            completed: false
          }
        ];
        setTodos(deepCopyJSONArray(todos));
        setQueriedTodos(deepCopyJSONArray(todos));
        setCurrentTodoInput('');
      }
    },

    searchTodos(searchQuery) {
      setQueriedTodos(
        searchQuery === ''
          ? deepCopyJSONArray(todosContext.todos)
          : new Fuse(
              todosContext.todos,
              {
                tokenize: true,
                threshold: 0,
                location: 0,
                keys: ['task']
              },
              searchQuery
            ).search(searchQuery)
      );
      setSearchQuery(searchQuery);
    },

    toggleCompletedTodo(e) {
      const todos = deepCopyJSONArray(todosContext.todos);
      for (let i = 0; i < todos.length; i++) {
        if (todos[i]._id === e.currentTarget.dataset.id) {
          todos[i].completed = !todos[i].completed;
          break;
        }
      }
      const queriedTodos = deepCopyJSONArray(todosContext.queriedTodos);
      for (let i = 0; i < queriedTodos.length; i++) {
        if (queriedTodos[i]._id === e.currentTarget.dataset.id) {
          queriedTodos[i].completed = !queriedTodos[i].completed;
          break;
        }
      }

      setTodos(todos);
      setQueriedTodos(queriedTodos);
    },

    removeCompletedTodos(e) {
      setTodos(todosContext.todos.filter(todo => !todo.completed));
      setQueriedTodos(
        todosContext.queriedTodos.filter(todo => !todo.completed)
      );
    },

    handleKeyDown(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.stopPropagation();
        e.preventDefault();
        e.currentTarget.value = '';

        if (e.currentTarget.name === 'setCurrentTodoInput') {
          todosContext.addTodo(e);
        }
      }
    },

    handleChange(e) {
      if (e.currentTarget.name === 'setSearchQuery') {
        todosContext.searchTodos(e.currentTarget.value);
      } else {
        todosContext[e.currentTarget.name](e.currentTarget.value);
      }
    },

    handleClick: function(e) {
      const button = e.currentTarget.name || e.currentTarget.dataset.id;
      switch (button) {
        case 'todo-add':
          todosContext.addTodo(e);
          break;
        case 'remove-completed-todos':
          todosContext.removeCompletedTodos(e);
          break;
        default:
          todosContext.toggleCompletedTodo(e);
      }
    }
  };

  return (
    <TodosContext.Provider value={todosContext}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
