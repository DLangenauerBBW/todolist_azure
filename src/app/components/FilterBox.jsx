'use client'

import './ToDo.css';

export default function FilterBox({ 
  closeWindow, 
  priorityFilter, 
  setPriorityFilter, 
  categoryFilter, 
  setCategoryFilter 
}) {
  const handlePriorityFilterChange = (priority) => {
    setPriorityFilter(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority) 
        : [...prev, priority].sort((a, b) => a - b)
    );
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilter(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="filterOverlay" onClick={closeWindow}>
      <div className="filterContent" onClick={(e) => e.stopPropagation()}>
        <button className="filterClose" onClick={closeWindow}>×</button>
        <h3>Filter Tasks</h3>
        <div className="filterSection">
          <h4>Priority</h4>
          {[1, 2, 3, 4, 5].map(prio => (
            <label key={prio} className="filterCheckbox">
              <input
                type="checkbox"
                checked={priorityFilter.includes(prio)}
                onChange={() => handlePriorityFilterChange(prio)}
              />
              Priority {prio}
            </label>
          ))}
        </div>
        <div className="filterSection">
          <h4>Category</h4>
          {["Pending", "In Progress", "Completed"].map(category => (
            <label key={category} className="filterCheckbox">
              <input
                type="checkbox"
                checked={categoryFilter.includes(category)}
                onChange={() => handleCategoryFilterChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}