import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  EDIT_TASK,
  SELECT_TASK,
  INCREMENT_TASK,
} from "./../constants/actions";
import uuid from "uuid/v4";
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          id: uuid(),
          isDone: false,
          task: action.task,
          notes: action.notes,
          pomodorosDone: 0,
          pomodorosEstimated: action.pomodorosEstimated,
        },
      ];
    case REMOVE_TASK:
      return state.filter((task) => task.id !== action.id);
    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.id ? { ...task, isDone: !task.isDone } : task
      );
    case EDIT_TASK:
      return state.map((task) =>
        task.id === action.id
          ? {
              ...task,
              task: action.task,
              notes: action.notes,
              pomodorosEstimated: action.pomodorosEstimated,
            }
          : task
      );
    case SELECT_TASK:
      return state.map((task) =>
        task.id === action.id
          ? { ...task, isDoing: true }
          : { ...task, isDoing: false }
      );
    case INCREMENT_TASK:
      return state.map((task) =>
        task.isDoing ? { ...task, pomodorosDone: task.pomodorosDone + 1 } : task
      );

    default:
      return state;
  }
};
export default reducer;