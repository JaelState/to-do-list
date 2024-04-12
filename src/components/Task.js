import React from 'react';
import { Check, Clear } from '@mui/icons-material';

const Task = (props) => {
  return (
    <div
      className="task"
      style={{
        padding: '20px',
        marginBottom: '5px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative', // Set position to relative for absolute positioning of delete button
        border: `2px solid ${props.completed ? 'green' : 'transparent'}`, // Border around the check mark
      }}
    >
      <div style={{ position: 'relative' }}>
        <Check
          onClick={() => props.completeTask(props.id)}
          style={{ cursor: 'pointer', marginRight: '10px', color: props.completed ? 'green' : 'black' }}
        />
        {props.completed && <div className="green-background" />} {/* Green background when completed */}
      </div>
      <div style={{ flex: '1', margin: '0' }}>
        <h1>{props.taskName}</h1>
        {/* Update this line */}
      </div>
      <Clear
        onClick={() => props.deleteTask(props.id)}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '5px',
          right: '5px',
          fontSize: '16px',
        }}
      />
    </div>
  );
};

export default Task;
