import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import EditIcon from "@material-ui/icons/Edit";

import { TOGGLE_TASK, SELECT_TASK } from "./../constants/actions";
import { DispatchContext } from "./../contexts/Tasks.context";
import { Chip } from "@material-ui/core";
import TaskForm from "./TaskForm";
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

  const handleEdit = () => {
    setEditting(!isEditting);
  };
  const handleDone = () => {
    dispatch({ type: TOGGLE_TASK, id });
  };

  const handleSelect = () => {
    dispatch({ type: SELECT_TASK, id });
  };

  return (
    <React.Fragment>
      {isEditting ? (
        <TaskForm
          action="EDIT_TASK"
          id={id}
          handleCancel={handleEdit}
          task={task}
          notes={notes}
          pomodorosEstimated={pomodorosEstimated}
        />
      ) : (
        <Card className={isDoing ? classes.selected : classes.notSelected}>
          <ListItem button className={isDone ? classes.done : classes.notDone}>
            {isDoing ? (
              <Chip label="Focusing On" color="primary" size="small" />
            ) : null}
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
