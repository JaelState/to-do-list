import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import Task from './components/Task'; // Import Task component


const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' for showing all tasks initially
  const [sort, setSort] = useState('none'); // 'none' for no sorting initially
  const [category, setCategory] = useState('');

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'taskName') {
      setNewTask(value);
    } else if (name === 'category') {
      setCategory(value);
    }
  };

  const addTask = (task) => {
    setTodoList([...todoList, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
  };

  const filteredTodoList = todoList.filter((task) => {
    if (filter === 'all') {
      return true; // Show all tasks
    } else if (filter === 'completed') {
      return task.completed; // Only show completed tasks
    } else if (filter === 'incomplete') {
      return !task.completed; // Only show incomplete tasks
    
}});

const groupedTasks = filteredTodoList.reduce((groups, task) => {
  const category = task.category || 'Uncategorized'; // Default category if none is provided
  if (!groups[category]) {
    groups[category] = [];
  }
  groups[category].push(task);
  return groups;
}, {});
    



  const sortedTodoList = [...filteredTodoList]; // Create a copy of the filteredTodoList array to avoid mutating the original array

  for (const category in groupedTasks) {
  if (sort === 'asc') {
    groupedTasks[category].sort((a, b) => a.taskName.localeCompare(b.taskName));
  } else if (sort === 'desc') {
    groupedTasks[category].sort((a, b) => b.taskName.localeCompare(a.taskName));
  }
}


  const sortedCategories = Object.keys(groupedTasks).sort();
  if (sort === 'category') {
    sortedTodoList.sort((a, b) => a.category.localeCompare(b.category));
  }
  

  return (
    <div className="App">
      <Header />
      <div className="spacer" style={{ height: '20px' }}></div>
      <TaskInput onAddTask={addTask} /> {/* Pass onAddTask as prop */}
      <div className="filter-buttons">
  <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
  <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
  <button className={filter === 'incomplete' ? 'active' : ''} onClick={() => setFilter('incomplete')}>Incomplete</button>
  <button className={filter === 'category' ? 'active' : ''} onClick={() => setFilter('category')}>Category</button>

</div>

    <div className="sort-buttons">
  <button className={sort === 'asc' ? 'active' : ''} onClick={() => setSort('asc')}>Sort A-Z</button>
  <button className={sort === 'desc' ? 'active' : ''} onClick={() => setSort('desc')}>Sort Z-A</button>
  <button className={sort === 'none' ? 'active' : ''} onClick={() => setSort('none')}>Reset Sorting</button>
</div>

<div className="list">
        {sort !== 'none'
          ? sortedCategories.map((category) => (
              <div key={category}>
                <h2>{category}</h2>
                {groupedTasks[category].map((task) => (
                  <Task
                    key={task.id}
                    taskName={task.taskName}
                    category={task.category}
                    id={task.id}
                    completed={task.completed}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                  />
                ))}
              </div>
            ))
          : Object.entries(groupedTasks).map(([category, tasks]) => (
              <div key={category}>
                <h2>{category}</h2>
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    taskName={task.taskName}
                    category={task.category}
                    id={task.id}
                    completed={task.completed}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                  />
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default App;
