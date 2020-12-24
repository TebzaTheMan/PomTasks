import React, { createContext, useContext } from 'react';
import tasksReducer from '../reducers/Tasks.reducer';
import useFireStoreReducer from '../hooks/useFireStoreReducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';
import { UserContext } from './User.context';

const TasksContext = createContext();
export const DispatchContext = createContext();
export default TasksContext;

const defaultTasks = [
  {
    id: '1',
    task: 'Welcome to Pomodoro Timer',
    pomodorosDone: 0,
    pomodorosEstimated: 1,
    notes: 'Use this app to boost your productivity',
    isDone: false,
    isDoing: false,
  },
];

// eslint-disable-next-line react/prop-types
export function TasksProvider({ children }) {
  const user = useContext(UserContext);
  const [tasks, dispatch] = user === null
    ? useLocalStorageReducer(
      'tasks',
      tasksReducer,
      defaultTasks,
    )
    : useFireStoreReducer(
      'tasks',
      tasksReducer,
      defaultTasks,
      user.uid,
    );

  return (
    <TasksContext.Provider value={tasks}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TasksContext.Provider>
  );
}
