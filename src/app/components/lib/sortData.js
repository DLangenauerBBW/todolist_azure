export const sortData = (taskList, sortBy, priorityFilter) => {
    let sortedTasks = [...taskList];
    
    switch (sortBy) {
      case 'Name Asc':
        sortedTasks.sort((a, b) => a.task_name.localeCompare(b.task_name));
        break;
      case 'Name Desc':
        sortedTasks.sort((a, b) => b.task_name.localeCompare(b.task_name));
        break;
      case 'Prio Asc':
        sortedTasks.sort((a, b) => a.task_priority - b.task_priority);
        break;
      case 'Prio Desc':
        sortedTasks.sort((a, b) => b.task_priority - a.task_priority);
        break;
      default:
        break;
    }
  
    return sortedTasks.filter(task => priorityFilter.includes(task.task_priority));
  };