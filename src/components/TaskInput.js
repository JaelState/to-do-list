import React, { useState } from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TaskInput = ({ onAddTask }) => {
    const [newTask, setNewTask] = useState('');
    const [category, setCategory] = useState('');
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'taskName') {
        setNewTask(value);
      } else if (name === 'category') {
        setCategory(value);
      }
    };
  
    const addTask = () => {
      if (newTask.trim() !== '') {
        const task = {
          id: Date.now(),
          taskName: newTask,
          category: category || 'None', // Default to 'None' if no category is selected
          completed: false,
        };
        onAddTask(task);
        setNewTask('');
        setCategory('');
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    };
  
    return (
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            size="small"
            label="Enter a new task..."
            variant="outlined"
            name="taskName"
            value={newTask}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            InputLabelProps={{
              style: { color: 'black' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={addTask}
            sx={{
              backgroundColor: 'black',
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    );
  };
  
  export default TaskInput;