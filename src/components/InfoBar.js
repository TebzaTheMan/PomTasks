import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TasksContext from "./../contexts/Tasks.context";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    width: "100%",
    maxWidth: 600,
    padding: 30,
    marginBottom: 30,
  },
}));

const getTotalPomodoros = (tasks, type) => {
  let poms;
  if (type === "estimated") {
    poms = tasks.map((task) => {
      return task.pomodorosEstimated;
    });
  } else {
    poms = tasks.map((task) => {
      return task.pomodorosDone;
    });
  }

  return poms.reduce((a, b) => {
    return a + b;
  });
};

function InfoBar() {
  const classes = useStyles();
  const tasks = useContext(TasksContext);
  return (
    <div align="center">
      <Paper className={classes.root} elevation={2} square>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h5">
              Est: <span>{getTotalPomodoros(tasks, "estimated")}</span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Act: <span>{getTotalPomodoros(tasks, "act")}</span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Finish at <span>19:02</span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default InfoBar;
