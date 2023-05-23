import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import { apiClient } from './ApiClient'

function TodoList() {

    const [todos, setTodos] = useState([]);

    const getTodos = () => apiClient.get(`/todos`)

    useEffect ( () => refreshTodos(), [])

    function refreshTodos() {
        
      getTodos()
      .then(response => {
          setTodos(response.data)
      }
          
      )
      .catch(error => console.log(error))
  
  }
  
    const addTodo = (todo) => {
      apiClient.post(`/todos`, todo)
      if (!todo.text || /^\s*$/.test(todo.text)) {
        return;
      }
      const newTodos = [todo, ...todos];
  
      setTodos(newTodos);
      console.log(...todos);
    }

    const updateTodo = (originalText, text) => {
      apiClient.put(`/todos/${originalText}`, text)
      setTodos(prev => prev.map(item => (item.text === originalText ? text : item)));
    };
  
    const removeTodo = (originalText) => {
      apiClient.delete(`/todos/${originalText}`)
      const removedArr = [...todos].filter(todo => todo.text !== originalText);
      setTodos(removedArr);
    }

    const completeTodo = (id) => {
        let updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
          }
          return todo;
        });
        setTodos(updatedTodos);
      };

      


      return (
        <>
          <h1>What's the Plan for Today?</h1>
          <TodoForm onSubmit={addTodo} />
          <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </>
      );
}
export default TodoList;