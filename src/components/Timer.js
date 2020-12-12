import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import bellsound from "./../sounds/bell.mp3";
import clicksound from "./../sounds/click.mp3";

import { INCREMENT_TASK } from "./../constants/actions";
import { DispatchContext } from "./../contexts/Tasks.context";
import TasksContext from "./../contexts/Tasks.context";

Timer.propTypes = {
  initialMinutes: PropTypes.number.isRequired,
  timerType: PropTypes.string.isRequired,
};
let pomsDone = 0;
export default function Timer({ initialMinutes, timerType, changeTab }) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isOn, setSwitch] = useState(false);
  const [isTimeUp, setisTimeUp] = useState(false);
  const audioBellsound = new Audio(bellsound);
  const audioClicksound = new Audio(clicksound);
  const tasks = useContext(TasksContext);
  const dispatch = useContext(DispatchContext);

  const start = () => {
    audioClicksound.currentTime = 0;
    audioClicksound.play();
    setSwitch(true);
    if (timerType === "pomodoro") {
      notify("Time to work! You got this!");
    }
  };
  const stop = () => {
    setSwitch(false);
    audioClicksound.currentTime = 0;
    audioClicksound.play();
  };
  const reset = () => {
    setSwitch(true);
    setisTimeUp(false);
    setMinutes(initialMinutes);
    setSeconds(0);
    notify("Let's do this !");
  };
  const countDown = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        setisTimeUp(true);
        setSwitch(false);
        audioBellsound.play();
        countpomsDone();
        if (timerType === "pomodoro") {
          notify("Time To take a break!");
          dispatch({ type: INCREMENT_TASK });
        } else {
          notify("Time to Work!");
        }
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }
    if (minutes === 5 && seconds === 0 && timerType !== "shortbreak") {
      notify("5 minutes left !");
    }
  };
  const showButton = () => {
    let button;
    if (isOn) {
      button = (
        <Button size="large" variant="contained" color="primary" onClick={stop}>
          STOP
        </Button>
      );
    } else if (isTimeUp) {
      button = (
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={reset}
        >
          START
        </Button>
      );
    } else {
      button = (
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={start}
        >
          START
        </Button>
      );
    }
    return button;
  };
  const updateTitle = () => {
    let secs = seconds < 10 ? `0${seconds}` : seconds;
    if (isTimeUp) {
      document.title = `${minutes}:${secs} - Time Up!`;
    } else {
      if (timerType === "pomodoro") {
        let focusedOnTask = tasks.find(function (task) {
          return task.isDoing === true;
        });

        document.title = `${minutes}:${secs} - ${
          focusedOnTask === undefined ? "Time to work" : focusedOnTask.task
        }`;
      } else if (timerType === "shortbreak") {
        document.title = `${minutes}:${secs} - time for a short break!`;
      } else if (timerType === "longbreak") {
        document.title = `${minutes}:${secs} - time for long break!`;
      } else {
        document.title = `Pomodoro Timer`;
      }
    }
  };
  const notify = (message) => {
    Notification.requestPermission();
    new Notification(message);
  };

  const countpomsDone = () => {
    if (timerType === "pomodoro") {
      if (pomsDone === 4) {
        changeTab(2); // go to long break tab
        pomsDone = 0;
      } else {
        pomsDone = pomsDone + 1;
        changeTab(1); // go to short break
      }
    } else {
      changeTab(0);
    }
  };
  useEffect(() => {
    updateTitle();
    let interval = 0;
    if (isOn) {
      interval = setInterval(countDown, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div>
      <Typography variant="h1">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
      <Typography variant="h5">{isTimeUp ? `Time Up!` : ``}</Typography>
      {showButton()}
    </div>
  );
}
