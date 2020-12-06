import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Task from "./Task";
import AddTask from "./AddTask";
import TasksContext from "./../contexts/Tasks.context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
  },
}));

export default function Tasks() {
  const classes = useStyles();
  const tasks = useContext(TasksContext);
  return (
    <div className="tasks" align="center">
      <h1>Tasks</h1>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {tasks.map((taskObject) => {
          const {
            id,
            isDone,
            task,
            notes,
            pomodorosDone,
            pomodorosEstimated,
            isDoing,
          } = taskObject;
          return (
            <Task
              key={id}
              id={id}
              isDone={isDone}
              task={task}
              notes={notes}
              pomodorosDone={pomodorosDone}
              pomodorosEstimated={pomodorosEstimated}
              isDoing={isDoing}
            />
          );
        })}
        <AddTask />
      </List>
    </div>
  );
}
