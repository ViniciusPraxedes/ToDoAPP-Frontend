import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [existingValues, setExistingValues] = useState([]);
  const [isInputValid, setIsInputValid] = useState(true);

  const inputRef = useRef(null);
  const [counter, setCounter] = useState(1);

  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    setInput(e.target.value);
    setIsInputValid(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim() === '') {
      setIsInputValid(false);
    } else if (existingValues.includes(input)) {
      setIsInputValid(false);
    } else {
      props.onSubmit({
        id: counter,
        text: input
      });
      incrementCounter();
      setInput('');
      setIsInputValid(true);
      setExistingValues(prevValues => [...prevValues, input]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            className={`todo-input ${!isInputValid ? 'invalid' : ''}`}
            ref={inputRef}
          />
          {!isInputValid && <p className='error-message'>Value already exists</p>}
          <button type='submit' className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className={`todo-input ${!isInputValid ? 'invalid' : ''}`}
            ref={inputRef}
          />
          {!isInputValid && <p className='error-message'>Todo already exists</p>}
          <button type='submit' className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
