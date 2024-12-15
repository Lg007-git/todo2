import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState('');
 

  const API_BASE_URL = 'http://localhost:3001';
  

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    axios.post(`${API_BASE_URL}/add`, { task: task })
      .then(result => {
        setTask(''); // Clear the input field after adding
        // alert("Task added successfully!");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
