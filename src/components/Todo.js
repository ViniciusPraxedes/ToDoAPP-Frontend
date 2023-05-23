import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { apiClient } from './ApiClient'

const Todo = ({todos, completeTodo, removeTodo, updateTodo }) => {
  
    const [edit, setEdit] = useState({
      id: null,
      value: '',
      originalText: ''
    });
  
    const submitUpdate = value => {
      updateTodo(edit.originalText, value);
      setEdit({
        id: null,
        value: '',
        originalText: ''
      });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
      }

    
    return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.text)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id , value: todo.text, originalText: todo.text})}
          className='edit-icon'
        />
      </div>
    </div>
  ));

};

export default Todo;