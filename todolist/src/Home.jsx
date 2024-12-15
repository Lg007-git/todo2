import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';

function Home() {
  const [todos, setTodos] = useState([]);
  const API_BASE_URL =  'http://localhost:3001';
  

  useEffect(() => {
    axios.get(`${API_BASE_URL}/get`)
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, [API_BASE_URL]);

  const handleEdit = (id) => {
    axios.put(`${API_BASE_URL}/update/${id}`)
      .then(result => {
        setTodos(prev => prev.map(todo => 
          todo._id === id ? { ...todo, done: true } : todo
        ));
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/delete/${id}`)
      .then(result => {
        setTodos(prev => prev.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      <h1>Todo List</h1>
      <Create />
      <br />
      {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map(todo => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;