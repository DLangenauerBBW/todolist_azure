'use client'

import React, { useState } from 'react';
import './ToDo.css';

export default function EditBox({ closeWindow, task, submitEditTask }) {
  //Setzt den State für das Formular und setzt die Werte des ausgewählten Tasks als startwerte
  const [formData, setFormData] = useState({
    id: task.id,
    task_name: task.task_name,
    task_priority: task.task_priority,
    description: task.description,
    status: task.status
  });
  //Changehandler, aktualisiert den State bei jeder einzelnen Änderung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  //Submithandler, schickt den aktuellen Formstate an die API
  const handleSubmit = (e) => {
    e.preventDefault();
    submitEditTask({...formData });
    closeWindow();
  };

  return (
    <div onClick={closeWindow} className="addtaskOverlay">
      <div className="addtaskContent" onClick={(e) => e.stopPropagation()}>
        <button className="addtaskClose" onClick={closeWindow}>×</button>
        <form onSubmit={handleSubmit}>
          <h2 className="addTaskTitle">Edit Task</h2>
          <div className="formField">
            <input 
              type="text" 
              name="task_name"
              placeholder="Task Name" 
              value={formData.task_name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="formField">
            <label>Priority: {formData.task_priority}</label>
            <input 
              type="range" 
              name="task_priority"
              min={1} 
              max={5} 
              value={formData.task_priority}
              onChange={handleChange}
            />
            <div className="rangeLabels">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            </div>
          </div>
          <div className="formField">
            <textarea 
              name="description"
              placeholder="Description" 
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="formField">
            <label>Category:</label><br/>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <button type="submit" className="saveButton">Save Changes</button>
        </form>
      </div>
    </div>
  );
}