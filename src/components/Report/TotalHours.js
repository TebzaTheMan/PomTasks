/* eslint-disable react/prop-types */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function TotalHours({ data }) {
  const focusHours = [];
  const getTotalTime = () => {
    data.map((entry) => focusHours.push(entry.focusedHours));
    return focusHours.reduce((a, b) => a + b, 0);
  };
  const totalTime = getTotalTime();
  const getHours = (time) => Math.trunc(time);

  const getMinutes = (time) => {
    const remainderHours = time - Math.trunc(time);
    const minutes = remainderHours * 60;
    return minutes.toFixed(0);
  };
  return (
    <>
      <Divider />
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h5">
            Total :
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">
            {getHours(totalTime)}
            h and
            {getMinutes(totalTime)}
            mins
          </Typography>
        </Box>
      </Box>

    </>
  );
}
