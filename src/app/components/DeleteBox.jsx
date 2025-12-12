'use client'

import React from 'react';
import './ToDo.css';

export default function DeleteBox({ closeWindow, task, submitDeleteTask }) {
  const handleDelete = () => {
    submitDeleteTask(task);
    closeWindow();
  };

  return (
    <div onClick={closeWindow} className="addtaskOverlay">
      <div className="addtaskContent" onClick={(e) => e.stopPropagation()}>
        <button className="addtaskClose" onClick={closeWindow}>×</button>
        <div className="deleteConfirmation">
          <h2>Delete Task</h2>
          <p>Are you sure you want to delete "{task.task_name}"?</p>
          <div className="deleteButtons">
            <button className="cancelButton" onClick={closeWindow}>Cancel</button>
            <button className="confirmDeleteButton" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}