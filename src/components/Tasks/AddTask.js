import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TaskForm from './TaskForm';

export default function AddTask() {
  const [showaddForm, setAddForm] = useState(false);

  const handleClick = () => {
    setAddForm(!showaddForm);
  };
  return (
    <div>
      {showaddForm ? (
        <TaskForm
          action="ADD_TASK"
          handleCancel={handleClick}
        />
      ) : (
        <Button
          color="primary"
          fullWidth
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleClick}
          size="large"
        >
          Add Task
        </Button>
      )}
    </div>
  );
}
