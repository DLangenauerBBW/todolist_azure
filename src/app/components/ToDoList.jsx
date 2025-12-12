'use client'

import './ToDo.css';
import { useState, useEffect } from "react";
import AddBox from "./AddBox";
import TaskSection from './TaskSection';
import FilterBox from './FilterBox';
import { fetchTasks, addTask, editTask, deleteTask } from './lib/api'; 
import { sortData } from './lib/sortData';

export default function ToDoList() {
  //BooleanState der Besagt ob die "Add Task" Box angezeigt werden soll oder nicht
  const [addBoxState, setAddBoxState] = useState(false);
  //BooleanState der Besagt ob die  Filterbox angezeigt werden soll oder nicht
  const [filterBoxState, setFilterBoxState] = useState(false);
  //Alle Tasks werden in einem Stata egespeichert 
  const [tasks, setTasks] = useState([]);
  //Die Tasks werden je nach Status in eigene States aufgeteilt, um den Task in der entsprechenden Box anzuzeigen
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  //State der angibt, welche Sortierung momentan aktuell ist
  const [sortBy, setSortBy] = useState('Prio Asc');
  
  const [priorityFilter, setPriorityFilter] = useState([1, 2, 3, 4, 5]);
  const [categoryFilter, setCategoryFilter] = useState(["Pending", "In Progress", "Completed"]);

  useEffect(() => {
    fetchTasks(setTasks);
    const filteredTasks = sortData(tasks, sortBy, priorityFilter);
    setPendingTasks(filteredTasks.filter(task => task.status === "PENDING"));
    setInProgressTasks(filteredTasks.filter(task => task.status === "IN_PROGRESS"));
    setCompletedTasks(filteredTasks.filter(task => task.status === "COMPLETED"));
  }, [tasks, sortBy, priorityFilter]);

  // Handlers
  const addButtonHandler = () => setAddBoxState(!addBoxState);
  const filterButtonHandler = () => setFilterBoxState(!filterBoxState);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleAddTask = (newTask) => addTask(newTask, tasks, setTasks).then(() => setAddBoxState(false));

  return (
    <>
      <div className="container">
        <div className="body">
          {addBoxState && <AddBox closeWindow={addButtonHandler} submitAddTask={handleAddTask} />}
          {filterBoxState && (
            <FilterBox 
              closeWindow={filterButtonHandler}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          )}
          <div className="menuBar">
            <button onClick={addButtonHandler}>Add</button>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="Name Asc">Name Asc</option>
              <option value="Name Desc">Name Desc</option>
              <option value="Prio Asc">Prio Asc</option>
              <option value="Prio Desc">Prio Desc</option>
            </select>
            <button onClick={filterButtonHandler}>Filter</button>
          </div>
          <div className="content">
            {categoryFilter.includes("Pending") && (
              <TaskSection title="Pending" tasks={pendingTasks} onEdit={editTask} onDelete={deleteTask} />
            )}
            {categoryFilter.includes("In Progress") && (
              <TaskSection title="In Progress" tasks={inProgressTasks} onEdit={editTask} onDelete={deleteTask} />
            )}
            {categoryFilter.includes("Completed") && (
              <TaskSection title="Completed" tasks={completedTasks} onEdit={editTask} onDelete={deleteTask} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}