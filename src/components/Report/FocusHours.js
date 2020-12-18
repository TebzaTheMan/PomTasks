import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryLabel,
} from 'victory';

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '25px',
    marginTop: 20,
  },
}));
const data = [
  { date: '12-Dec', focusedHours: 0 },
  { date: '13-Dec', focusedHours: 1 },
  { date: '14-Dec', focusedHours: 0.5 },
  { date: '15-Dec', focusedHours: 0.2 },
  { date: '16-Dec', focusedHours: 0.7 },
  { date: '17-Dec', focusedHours: 0.1 },
  { date: '18-Dec', focusedHours: 0.5 },
];
export default function FocusHours() {
  const classes = useStyles();
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
          data={data}
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
