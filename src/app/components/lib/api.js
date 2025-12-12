// api.js
import testTasks from './testdata';

export const fetchTasks = async (setTasks) => {
  try {
    const response = await fetch('http://localhost:8080/tasks');
    const data = await response.json();
    setTasks(data);
  } catch (error) {
    setTasks(testTasks);
  }
};

export const addTask = async (newTask, tasks, setTasks) => {
    console.log(newTask)
  try {
    const response = await fetch('http://localhost:8080/tasks', { method: 'POST',headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(newTask) });
    const savedTask = await response.json();
    console.log(savedTask)
    setTasks(prev => [...prev, savedTask]);
    return savedTask;
  } catch (error) {
    console.log('Failed to add task:', error);
    setTasks(tasks => [...tasks, newTask]);
  }
};

export const editTask = async (updatedTask) => {
  console.log(updatedTask)
  try {
    await fetch(`http://localhost:8080/tasks/${updatedTask.id}`, { method: 'PUT', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(updatedTask) });
  } catch (error) {
    console.log('Failed to edit task:', error);
  }
};

export const deleteTask = async (taskToDelete) => {
  try {
    await fetch(`http://localhost:8080/tasks/${taskToDelete.id}`, { method: 'DELETE' });
  } catch (error) {
    console.log('Failed to delete task:', error);
  }
};