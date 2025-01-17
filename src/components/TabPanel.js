/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Timer from './Timer';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root} align="center" square variant="outlined">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Pomodoro" />
        <Tab label="Short Break" />
        <Tab label="Long Break" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Timer initialMinutes={25} timerType="pomodoro" changeTab={setValue} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Timer initialMinutes={5} timerType="shortbreak" changeTab={setValue} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Timer initialMinutes={15} timerType="longbreak" changeTab={setValue} />
      </TabPanel>
    </Paper>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
