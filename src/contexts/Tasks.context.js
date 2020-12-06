import React, { createContext, useReducer } from "react";
import tasksReducer from "./../reducers/Tasks.reducer";
const TasksContext = createContext();
export const DispatchContext = createContext();
export default TasksContext;

const defaultTasks = [];
export function TasksProvider(props) {
  const [tasks, dispatch] = useReducer(tasksReducer, defaultTasks);
  return (
    <TasksContext.Provider value={tasks}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </TasksContext.Provider>
  );
}
