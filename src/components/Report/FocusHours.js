import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '25px',
    marginTop: 20,
  },
}));
export default function FocusHours() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" className={classes.heading}>
        Focus Hours
      </Typography>
      <Divider />
    </>
  );
}
