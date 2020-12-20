import React, { createContext } from 'react';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';
import WeeklyDataReducer from '../reducers/WeeklyData.reducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const WeeklyDataContext = createContext();
export const DispatchContext = createContext();
export default WeeklyDataContext;

const getThisWeekDays = () => {
  const prevWeek = startOfWeek(Date.now());
  const week = {};
  const dataHold = [];

  for (let x = 0; x < 7; x += 1) {
    week[prevWeek] = 0;
    prevWeek.setDate(prevWeek.getDate() + 1);
  }
  for (let x = 0; x < 7; x += 1) {
    const current = new Date(Object.keys(week)[x]);
    dataHold.push({ date: format(current, 'MM/dd/yyyy'), focusedHours: 0 });
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
