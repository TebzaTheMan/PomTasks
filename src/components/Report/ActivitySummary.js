import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import isYesterday from 'date-fns/isYesterday';
import StatsContext, { DispatchContext } from '../../contexts/Stats.context';
import {
  RESET_STREAK, INCREMENT_DAYS_ACCESSED, UPDATE_LASTUSED_DATE, INCREMENT_STREAK,
} from '../../constants/actions';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '25px',
  },
  numbers: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: theme.palette.grey.dark,
  },
  gridItem: {
    marginTop: 15,
  },
  text: {
    fontSize: '15px',
    fontWeight: 'bold',
  },
  Icon: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  card: {
    padding: 10,
    backgroundColor: theme.palette.grey.light,
  },
}));

export default function ActivitySummary() {
  const classes = useStyles();
  const stats = useContext(StatsContext);
  const dispatch = useContext(DispatchContext);

  const hasOneDayPassed = () => {
    let respond;
    const todayDate = new Date().toLocaleDateString();
    if (isYesterday(new Date(stats.lastUsed))) {
      respond = 'yes';
    } else if (stats.lastUsed === todayDate) {
      respond = 'today';
    } else {
      respond = 'no';
    }
    return respond;
  };

  const getStats = () => {
    const respond = hasOneDayPassed();
    if (respond === 'yes') {
      dispatch({ type: INCREMENT_STREAK });
      dispatch({ type: UPDATE_LASTUSED_DATE });
    } else if (respond === 'no') {
      dispatch({ type: INCREMENT_DAYS_ACCESSED });
      dispatch({ type: RESET_STREAK });
    }
  };
  getStats();
  return (
    <>
      <Typography variant="h2" className={classes.heading}>
        Activity Summary
      </Typography>
      <Divider />

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6} md={4} className={classes.gridItem}>
          <Card className={classes.card}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <AccessTimeIcon className={classes.Icon} fontSize="large" />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.numbers} color="textSecondary" gutterBottom>
                  {Number.parseFloat(stats.totalHours).toFixed(1)}
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
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <TodayIcon className={classes.Icon} fontSize="large" />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.numbers} color="textSecondary" gutterBottom>
                  {stats.daysAccessed}
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
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <WhatshotIcon className={classes.Icon} fontSize="large" />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.numbers} color="textSecondary" gutterBottom>
                  {stats.daysAccessed}
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
