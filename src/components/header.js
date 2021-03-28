import React from 'react';
import ReactGa from 'react-ga';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Report from './Report/Report';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    color: '#fff',
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
          <ReactGa.OutboundLink
            eventLabel="Github"
            to="https://github.com/tebzatheman/pomtasks"
            target="_blank"
            className={classes.icon}
          >
            <IconButton
              aria-label="github"
              edge="end"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
          </ReactGa.OutboundLink>
          <ReactGa.OutboundLink
            eventLabel="Twitter Feedback DM"
            to="https://twitter.com/messages/compose?recipient_id=4775018429&text=PomTasks%20Feedback:"
            target="_blank"
            className={classes.icon}
          >
            <IconButton
              aria-label="twitter"
              edge="end"
              color="inherit"
            >
              <TwitterIcon />
            </IconButton>
          </ReactGa.OutboundLink>

        </Toolbar>
      </AppBar>
    </div>
  );
}
