import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import TasksContext from "./../contexts/Tasks.context";
export default function WorkingOnTask() {
  const tasks = useContext(TasksContext);
  return (
    <div align="center">
      <Typography variant="h6">Working On :</Typography>
      {tasks.map((task) =>
        task.isDoing ? <Typography variant="h5">{task.task}</Typography> : null
      )}
    </div>
  );
}
