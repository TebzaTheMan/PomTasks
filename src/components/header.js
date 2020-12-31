import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Report from './Report/Report';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            PomTasks
          </Typography>
          <Report />
          <IconButton
            aria-label="close report-modal"
            aria-controls="close-modal"
            edge="end"
            color="inherit"
            // eslint-disable-next-line no-restricted-globals
            onClick={() => { location.href = 'https://github.com/tebzatheman/pomtasks'; }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="close report-modal"
            aria-controls="close-modal"
            color="inherit"
            edge="end"
            // eslint-disable-next-line no-restricted-globals
            onClick={() => { location.href = 'mailto:tebzax2@gmail.com?subject="Feedback about PomTasks"&body="write some message"'; }}
          >
            <EmailIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
