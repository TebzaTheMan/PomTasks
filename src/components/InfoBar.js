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
const getFinishTime = (pomodorosEstimateda) => {
  //for every poms you add 25 minutes and to get to another you add 5 min
  /**
   * if there is 1 pom you add only 25 minutes
   * theres 2 poms you add 2 25 minutes and only 1 5 mins
   * theres 3 poms you add 3 25 minutes and only 2 5 mins
   * theres 4 poms you add 4 25 minutes and only 3 5 mins
   *
   *
   *
   *
   *
   */
  let pomodorosEstimated = 2;
  let date = new Date();
  // add 25 minutes of pomodoros Estimated
  date.setMinutes(date.getMinutes() + pomodorosEstimated * 25);
  // 5 minutes breaks of pomodoros
  date.setMinutes(date.getMinutes() + (pomodorosEstimated - 1) * 5);

  let time = date.getHours() + ":" + date.getMinutes();

  return time;
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
              Finish at{" "}
              <span>
                {getFinishTime(getTotalPomodoros(tasks, "estimated"))}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default InfoBar;
