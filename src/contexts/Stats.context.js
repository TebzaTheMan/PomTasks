import React, { createContext } from 'react';
import StatsReducer from '../reducers/Stats.reducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const StatsContext = createContext();
export const DispatchContext = createContext();
export default StatsContext;

const defaultStats = {
  streak: 0,
  lastUsed: new Date().toLocaleDateString(),
  daysAccessed: 0,
  hoursFocused: 0,
};
// eslint-disable-next-line react/prop-types
export function StatsProvider({ children }) {
  const [Stats, dispatch] = useLocalStorageReducer(
    'Stats',
    StatsReducer,
    defaultStats,
  );
  return (
    <StatsContext.Provider value={Stats}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StatsContext.Provider>
  );
}
