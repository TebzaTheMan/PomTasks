import React, { createContext } from 'react';
import WeeklyDataReducer from '../reducers/WeeklyData.reducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const WeeklyDataContext = createContext();
export const DispatchContext = createContext();
export default WeeklyDataContext;

const getThisWeekDays = () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = Date.now();
  const todayDate = new Date(today);
  const prevWeek = new Date(todayDate.getTime() - oneDay * 6);
  const week = {};
  const dataHold = [];

  for (let x = 0; x < 7; x += 1) {
    const thisDay = prevWeek.toLocaleDateString();
    week[thisDay] = 0;
    prevWeek.setDate(prevWeek.getDate() + 1);
  }
  for (let x = 0; x < 7; x += 1) {
    const current = new Date(Object.keys(week)[x]);
    const month = current.toLocaleString('en-US', { month: 'short' });
    const shortenedDate = `${current.getDate()}-${month}`;
    dataHold.push({ date: shortenedDate, focusedHours: week[Object.keys(week)[x]] });
  }
  return dataHold;
};
const defaultWeeklyData = getThisWeekDays();

// eslint-disable-next-line react/prop-types
export function WeeklyDataProvider({ children }) {
  const [WeeklyData, dispatch] = useLocalStorageReducer(
    'WeeklyData',
    WeeklyDataReducer,
    defaultWeeklyData,
  );
  return (
    <WeeklyDataContext.Provider value={WeeklyData}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </WeeklyDataContext.Provider>
  );
}
