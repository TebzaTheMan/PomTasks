/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WeeklyDataContext, { DispatchContext } from '../../contexts/WeeklyData.context';
import { MOVE_TO_NEWDAY } from '../../constants/actions';
import FocusChart from './FocusChart';

function TabPanel({
  children, value, index, ...other
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

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
  const [value, setValue] = React.useState(0);
  const weeklyData = useContext(WeeklyDataContext);
  const todayData = [weeklyData[weeklyData.length - 1]]; // get last date (today's date)
  const dispatch = useContext(DispatchContext);
  updateWeeklyData(dispatch);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography variant="h2" className={classes.heading}>
        Focus Hours
      </Typography>
      <Divider />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Today" />
        <Tab label="This Week" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FocusChart data={todayData} type="today" />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <FocusChart data={weeklyData} type="week" />
      </TabPanel>

    </>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
