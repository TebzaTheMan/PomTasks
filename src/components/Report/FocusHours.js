import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryLabel, VictoryTooltip,
} from 'victory';
import WeeklyDataContext from '../../contexts/WeeklyData.context';

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '25px',
    marginTop: 20,
  },
}));

export default function FocusHours() {
  const classes = useStyles();
  const WeeklyData = useContext(WeeklyDataContext);
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
/**
const oneDay = 24 * 60 * 60 * 1000;

 let today = Date.now();

 let todayDate = new Date(today);

 let todayDateVal = todayDate.getTime();

 let prevWeek = new Date(todayDate.getTime() - oneDay * 6);

let week = {};

let dataHold = [];
 //set each day of the week to zero

 for (let x = 0; x < 7; x++) {

   let thisDay = prevWeek.toLocaleDateString();
   week[thisDay] = 0;

   prevWeek.setDate(prevWeek.getDate() + 1);

 }

 for (let x = 0; x < 7; x++) {

   let current =  new Date(Object.keys(week)[x]);
   let month = current.toLocaleString('en-US', {  month: 'short'});
   let shortenedDate = `${current.getDate()}-${month}`

   dataHold.push({ date: shortenedDate, focusedHours: week[Object.keys(week)[x]] });}

console.log(dataHold)
 */
