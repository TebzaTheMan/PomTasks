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
  const getHours = (time) => Math.trunc(time);
  // eslint-disable-next-line no-console
  console.log(getTotalTime());
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
            {getHours(getTotalTime())}
            h and 21mins
          </Typography>
        </Box>
      </Box>

    </>
  );
}
