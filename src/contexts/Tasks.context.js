import React, { createContext, useReducer } from "react";
import tasksReducer from "./../reducers/Tasks.reducer";
import useLocalStorageReducer from "../hooks/useLocalStorageReducer";
const TasksContext = createContext();
export const DispatchContext = createContext();
export default TasksContext;

const defaultTasks = [
  {
    id: 1,
    task: "Welcome to Pomodoro Timer",
    pomodorosDone: "0",
    pomodorosEstimated: "1",
    notes: "Use this app to boost your productivity",
    isDone: false,
    isDoing: false,
  },
];
export function TasksProvider(props) {
  const [tasks, dispatch] = useLocalStorageReducer(
    "tasks",
    tasksReducer,
    defaultTasks
  );
  return (
    <TasksContext.Provider value={tasks}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </TasksContext.Provider>
  );
}
