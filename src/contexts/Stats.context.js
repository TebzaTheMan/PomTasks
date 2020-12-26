import React, { createContext } from 'react';
import format from 'date-fns/format';
import StatsReducer from '../reducers/Stats.reducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const StatsContext = createContext();
export const DispatchContext = createContext();
export default StatsContext;
const todayDate = format(new Date(), 'MM/dd/yyyy');

const defaultStats = {
  streak: 1,
  lastUsed: todayDate,
  daysAccessed: 1,
  hoursFocused: 0,
};
// eslint-disable-next-line react/prop-types
export function StatsProvider({ children }) {
  const [stats, dispatch] = useLocalStorageReducer(
    'stats',
    StatsReducer,
    defaultStats,
  );
  return (
    <StatsContext.Provider value={stats}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StatsContext.Provider>
  );
}
