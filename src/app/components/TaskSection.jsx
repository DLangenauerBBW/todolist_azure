'use client'

import React, { useState } from 'react';
import EditBox from './EditBox';
import DeleteBox from './DeleteBox';
import './ToDo.css';

export default function TaskSection({ title, tasks, onEdit, onDelete }) {
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return '#e6f3e6';
      case 2: return '#f0f4e6';
      case 3: return '#f7f4e6';
      case 4: return '#f4ece6';
      case 5: return '#f4e6e6';
      default: return '#f0f0f0';
    }
  };

  return (
    <div className="taskSection">
      <div className="taskGrid">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="taskTile"
            style={{ backgroundColor: getPriorityColor(task.task_priority) }}
          >
            <div className="taskHeader">
              <h3>{task.task_name}</h3>
              <div className="taskActions">
                <button 
                  className="editBtn" 
                  onClick={() => setEditTask(task)}
                  title="Edit task"
                >
                  ✎
                </button>
                <button 
                  className="deleteBtn" 
                  onClick={() => setDeleteTask(task)}
                  title="Delete task"
                >
                  ✗
                </button>
              </div>
            </div>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
      <h4 className="sectionTitle">{title}</h4>
      {editTask && (
        <EditBox 
          closeWindow={() => setEditTask(null)}
          task={editTask}
          submitEditTask={onEdit}
        />
      )}
      {deleteTask && (
        <DeleteBox 
          closeWindow={() => setDeleteTask(null)}
          task={deleteTask}
          submitDeleteTask={onDelete}
        />
      )}
    </div>
  );
}