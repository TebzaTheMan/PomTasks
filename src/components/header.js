import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
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
        
          <Typography variant="h6" className={classes.title}>
            Pomodoro Timer
          </Typography>
          
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" >
          <HelpIcon/>
          </IconButton>

          <IconButton edge="end"  color="inherit" aria-label="settings">
          <SettingsIcon edge="end"/>
          </IconButton>
     
        </Toolbar>
      </AppBar>
    </div>
  );
}
