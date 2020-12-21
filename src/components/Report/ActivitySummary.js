import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import isYesterday from 'date-fns/isYesterday';

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '25px',
  },
  numbers: {
    fontSize: '25px',
    fontWeight: 'bold',
  },
  gridItem: {
    marginTop: 15,
  },
  text: {
    fontSize: '15px',
    fontWeight: 'bold',
  },
  Icon: {
    color: 'rgb(117, 117, 117)',
  },
  card: {
    padding: 10,
  },
}));
const getTotalFocusHours = () => {
  const totalHours = localStorage.hoursFocused === undefined
    ? localStorage.setItem('hoursFocused', 0)
    : localStorage.getItem('hoursFocused');
  return Number.parseFloat(totalHours).toFixed(1);
};
const hasOneDayPassed = () => {
  let respond;
  const todayDate = new Date().toLocaleDateString();
  if (isYesterday(new Date(localStorage.lastUsed))) {
    respond = 'yes';
  } else if (localStorage.lastUsed === todayDate) {
    respond = 'today';
  } else {
    respond = 'no';
  }
  return respond;
};
const getStats = () => {
  const respond = hasOneDayPassed();
  if (respond === 'yes') {
    localStorage.streak = Number(localStorage.streak) + 1;
    localStorage.daysAccessed = Number(localStorage.daysAccessed) + 1;
    localStorage.lastUsed = new Date().toLocaleDateString();
  } else if (respond === 'no') {
    localStorage.setItem('streak', 0);
  }
};

const daysAccessed = localStorage.daysAccessed === undefined
  ? localStorage.setItem('daysAccessed', 1)
  : localStorage.getItem('daysAccessed');

getStats();
const streak = localStorage.streak === undefined
  ? localStorage.setItem('streak', 0)
  : localStorage.getItem('streak');
export default function ActivitySummary() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" className={classes.heading}>
        Activity Summary
      </Typography>
      <Divider />

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6} md={4} className={classes.gridItem}>
          <Card className={classes.card}>
            <Grid container>
              <Grid item xs={3}>
                <AccessTimeIcon className={classes.Icon} fontSize="large" />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.numbers} color="textSecondary" gutterBottom>
                  {getTotalFocusHours()}
                </Typography>
                <Typography className={classes.text} color="textSecondary" gutterBottom>
                  hours focused
                </Typography>
              </Grid>
            </Grid>

          </Card>
        </Grid>
        <Grid item xs={6} md={4} className={classes.gridItem}>
          <Card className={classes.card}>
            <Grid container>
              <Grid item xs={3}>
                <TodayIcon className={classes.Icon} fontSize="large" />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.numbers} color="textSecondary" gutterBottom>
                  {daysAccessed}
                </Typography>
                <Typography className={classes.text} color="textSecondary" gutterBottom>
                  days Accessed
                </Typography>
              </Grid>
            </Grid>

          </Card>
        </Grid>

        <Grid item xs={6} md={4} className={classes.gridItem}>
          <Card className={classes.card}>
            <Grid container>
              <Grid item xs={3}>
                <WhatshotIcon className={classes.Icon} fontSize="large" />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.numbers} color="textSecondary" gutterBottom>
                  {streak}
                </Typography>
                <Typography className={classes.text} color="textSecondary" gutterBottom>
                  days streak
                </Typography>
              </Grid>
            </Grid>

          </Card>
        </Grid>
      </Grid>
    </>
  );
}
