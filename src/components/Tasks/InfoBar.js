import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TasksContext from '../../contexts/Tasks.context';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    maxWidth: 600,
    padding: 30,
    marginBottom: 30,
  },
}));

const getTotalPomodoros = (tasks, type) => {
  let poms;
  if (type === 'estimated') {
    poms = tasks.map((task) => task.isDone === false && task.pomodorosEstimated);
  } else {
    poms = tasks.map((task) => task.pomodorosDone);
  }

  const totalPoms = poms.reduce((a, b) => a + b, 0);
  return totalPoms;
};
const getFinishTime = (pomodorosEstimated) => {
  const getNumLongBreak = () => {
    const numLongBreak = (pomodorosEstimated - 1) / 4;
    return Math.trunc(numLongBreak);
  };
  const date = new Date();
  // Add 25 minutes of pomodoros Estimated
  date.setMinutes(date.getMinutes() + pomodorosEstimated * 25);
  // Add 5 minutes short breaks
  date.setMinutes(
    date.getMinutes()
      + ((pomodorosEstimated === 0 ? 1 : pomodorosEstimated) - 1) * 5,
  );
  // Add 15 minutes long breaks
  date.setMinutes(date.getMinutes() + getNumLongBreak() * 15);

  const time = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

  return time;
};
function InfoBar() {
  const classes = useStyles();
  const tasks = useContext(TasksContext);
  return (
    <div align="center">
      <Paper className={classes.root} elevation={2} square variant="outlined">
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h5">
              Est:
              {' '}
              <span>{getTotalPomodoros(tasks, 'estimated')}</span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Act:
              {' '}
              <span>{getTotalPomodoros(tasks, 'act')}</span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Finish at
              {' '}
              <span>
                {getFinishTime(getTotalPomodoros(tasks, 'estimated'))}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const MemoInfoBar = React.memo(InfoBar);
export default MemoInfoBar;
