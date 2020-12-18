import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ActivitySummary from './ActivitySummary';
import FocusHours from './FocusHours';

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
}));

export default function Report() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
          <Typography variant="h1" className={classes.modalTitle}>
            Personal Report
          </Typography>
          <ActivitySummary />
          <FocusHours />
        </div>
      </Modal>
    </>
  );
}
