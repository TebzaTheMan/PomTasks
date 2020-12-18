import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import WhatshotIcon from '@material-ui/icons/Whatshot';

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
                  15
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
                  11
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
                  3
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
