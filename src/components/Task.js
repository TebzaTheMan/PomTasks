import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";

import {
  TOGGLE_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  SELECT_TASK,
} from "./../constants/actions";
import { DispatchContext } from "./../contexts/Tasks.context";
import useInputState from "./../hooks/useInputState";
const useStyles = makeStyles((theme) => ({
  notSelected: {
    marginBottom: 10,
    backgroundColor: "rgb(255,255,255)",
  },
  selected: {
    marginBottom: 10,
    backgroundColor: "rgb(215, 215, 215)",
  },
  editForm: {
    marginBottom: 15,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  done: {
    textDecorationLine: "line-through",
    display: "flex",
  },
  notDone: {
    textDecorationLine: "none",
  },
  pomodorosDone: {
    fontSize: 23,
  },
}));
Task.propTypes = {
  id: PropTypes.any.isRequired,
  task: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  notes: PropTypes.string,
  pomodorosDone: PropTypes.number,
  pomodorosEstimated: PropTypes.string.isRequired,
};
function Task({
  id,
  isDone,
  task,
  notes,
  pomodorosDone,
  pomodorosEstimated,
  isDoing,
}) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const [isEditting, setEditting] = useState(false);
  const [newTask, handleNewTask] = useInputState(task);
  const [newNotes, handleNewNotes] = useInputState(notes);
  const [newPomEstimated, handleNewPomEstimated] = useInputState(
    pomodorosEstimated
  );
  const handleEdit = () => {
    setEditting(!isEditting);
  };
  const handleDone = () => {
    dispatch({ type: TOGGLE_TASK, id });
  };
  const handleDelete = () => {
    dispatch({ type: REMOVE_TASK, id });
  };
  const handleEdittingTask = () => {
    dispatch({
      type: EDIT_TASK,
      id,
      task: newTask,
      notes: newNotes,
      pomodorosEstimated: newPomEstimated,
    });
    handleEdit();
  };
  const handleSelect = () => {
    dispatch({ type: SELECT_TASK, id });
  };
  const editForm = () => {
    return (
      <Card className={classes.editForm}>
        <CardHeader title="Edit Task" />
        <CardContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Task"
                  variant="outlined"
                  autoFocus
                  required
                  fullWidth
                  name="task"
                  value={newTask}
                  onChange={handleNewTask}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  type="number"
                  id="standard-multiline-flexible"
                  label="Pomodoros Est."
                  variant="outlined"
                  fullWidth
                  required
                  value={newPomEstimated}
                  onChange={handleNewPomEstimated}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-multiline-flexible"
                  label="Notes"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={newNotes}
                  onChange={handleNewNotes}
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDelete}
            edge="start"
          >
            Delete
          </Button>
          <Button color="primary" variant="outlined" onClick={handleEdit}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdittingTask}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  };
  return (
    <React.Fragment>
      {isEditting ? (
        editForm()
      ) : (
        <Card className={isDoing ? classes.selected : classes.notSelected}>
          <ListItem button className={isDone ? classes.done : classes.notDone}>
            <IconButton onClick={handleDone}>
              {isDone ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>

            <ListItemText
              primary={task}
              secondary={notes}
              onClick={handleSelect}
            />
            <div edge="end">
              <p classes={classes.numberOfPomodoros}>
                <span className={classes.pomodorosDone}>{pomodorosDone}</span>/
                <span className={classes.pomodorosEstimate}>
                  {pomodorosEstimated}
                </span>
              </p>
            </div>

            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </ListItem>
        </Card>
      )}
    </React.Fragment>
  );
}
export default Task;
