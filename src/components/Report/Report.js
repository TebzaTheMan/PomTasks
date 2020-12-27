/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import format from 'date-fns/format';
import isThisWeek from 'date-fns/isThisWeek';
import isYesterday from 'date-fns/isYesterday';
import ActivitySummary from './ActivitySummary';
import FocusHours from './FocusHours';
import StatsContext, { DispatchContext } from '../../contexts/Stats.context';
import { DispatchContext as WeeklyDispatchContext } from '../../contexts/WeeklyData.context';
import {
  RESET_STREAK, INCREMENT_DAYS_ACCESSED, UPDATE_LASTUSED_DATE, INCREMENT_STREAK, NEW_WEEK,
} from '../../constants/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  paper: {
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function Report() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const stats = useContext(StatsContext);
  const dispatch = useContext(DispatchContext);
  const weeklyDispatch = useContext(WeeklyDispatchContext);

  const oneDayPassed = () => {
    dispatch({ type: UPDATE_LASTUSED_DATE });
    dispatch({ type: INCREMENT_STREAK });
    dispatch({ type: INCREMENT_DAYS_ACCESSED });
  };
  const someDaysPassed = () => {
    dispatch({ type: UPDATE_LASTUSED_DATE });
    dispatch({ type: INCREMENT_DAYS_ACCESSED });
    dispatch({ type: RESET_STREAK });
  };
  const updateWeeklyData = () => {
    weeklyDispatch({ type: NEW_WEEK });
  };
  const updateData = () => {
    const todayDate = format(new Date(), 'MM/dd/yyyy');
    console.log('updating data!');
    if (stats.lastUsed !== todayDate) {
      if (isYesterday(new Date(stats.lastUsed))) {
        oneDayPassed();
        console.log('last used was yesterday!');
      } else {
        someDaysPassed();
        console.log('Somedays have passed!');
      } if (!isThisWeek(new Date(stats.lastUsed))) {
        updateWeeklyData();
        console.log('Its a new week!');
      }
    }
  };

  useEffect(() => {
    updateData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        aria-label="report of app usage"
        aria-controls="report-appbar"
        color="inherit"
        edge="end"
        onClick={handleOpen}
      >
        <AssessmentIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Report of app usage"
        aria-describedby="summary of how much you focused on your tasks"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <IconButton
            aria-label="close report-modal"
            aria-controls="close-modal"
            color="inherit"
            edge="end"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <ActivitySummary />
          <FocusHours />
        </div>
      </Modal>
    </>
  );
}
