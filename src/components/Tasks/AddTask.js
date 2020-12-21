import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TaskForm from './TaskForm';

const useStyles = makeStyles(() => ({
  taskForm: {
    width: '100%',
    maxWidth: 500,
  },
}));

export default function AddTask() {
  const classes = useStyles();
  const [showaddForm, setAddForm] = useState(false);

  const handleClick = () => {
    setAddForm(!showaddForm);
  };
  return (
    <div className={classes.taskForm}>
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
