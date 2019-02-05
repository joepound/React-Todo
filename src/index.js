import React from 'react';
import { render } from 'react-dom';

import TodosProvider from './providers/TodosProvider';
import App from './App';

render(
  <TodosProvider>
    <App />
  </TodosProvider>,
  document.getElementById('root')
);
