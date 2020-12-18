import React, { createContext } from 'react';
import WeeklyDataReducer from '../reducers/WeeklyData.reducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const WeeklyDataContext = createContext();
export const DispatchContext = createContext();
export default WeeklyDataContext;

const defaultWeeklyData = [
  { date: '12-Dec', focusedHours: 0.6 },
  { date: '13-Dec', focusedHours: 1 },
  { date: '14-Dec', focusedHours: 0.5 },
  { date: '15-Dec', focusedHours: 0.2 },
  { date: '16-Dec', focusedHours: 0.7 },
  { date: '17-Dec', focusedHours: 0.1 },
  { date: '18-Dec', focusedHours: 0.5 },
];
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
