/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import format from 'date-fns/format';
import WeeklyDataContext from '../../contexts/WeeklyData.context';
import FocusChart from './FocusChart';
import TotalHours from './TotalHours';

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

export default function FocusHours() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const weeklyData = useContext(WeeklyDataContext);
  const todayData = [weeklyData.filter((data) => data.date === format(new Date(), 'MM/dd/yyyy'))];

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
        <FocusChart data={todayData[0]} type="today" />
        <TotalHours data={todayData[0]} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <FocusChart data={weeklyData} type="week" />
        <TotalHours data={weeklyData} />
      </TabPanel>
    </>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
