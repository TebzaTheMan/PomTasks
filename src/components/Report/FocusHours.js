import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryTooltip,
} from 'victory';
import WeeklyDataContext, { DispatchContext } from '../../contexts/WeeklyData.context';
import { MOVE_TO_NEWDAY } from '../../constants/actions';

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '25px',
    marginTop: 20,
  },
}));
const hasOneDayPassed = () => {
  const date = new Date().toLocaleDateString();
  if (localStorage.todayDate === date) {
    return false;
  } if (localStorage.todayDate === undefined) { // this is for first time run!
    localStorage.todayDate = date;
    return false;
  }
  localStorage.todayDate = date;
  return true;
};
const updateWeeklyData = (dispatch) => {
  if (!hasOneDayPassed()) return false;
  dispatch({ type: MOVE_TO_NEWDAY });
  return true;
};

export default function FocusHours() {
  const classes = useStyles();
  const WeeklyData = useContext(WeeklyDataContext);
  const dispatch = useContext(DispatchContext);
  updateWeeklyData(dispatch);
  return (
    <>
      <Typography variant="h2" className={classes.heading}>
        Focus Hours
      </Typography>
      <Divider />
      <VictoryChart
        domainPadding={20}
      >
        <VictoryLabel text="This Week" x={225} y={30} textAnchor="middle" />
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
        />
        <VictoryAxis
          dependentAxis
        />
        <VictoryBar
          data={WeeklyData}
          labels={({ datum }) => `${Number.isInteger(datum.focusedHours) ? datum.focusedHours : datum.focusedHours.toFixed(2)} hours`}
          labelComponent={<VictoryTooltip />}
          x="date"
          y="focusedHours"
          style={{
            data: { fill: '#1976d2' },

          }}
        />
      </VictoryChart>
    </>
  );
}
