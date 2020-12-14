import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Task from "./Task";
import AddTask from "./AddTask";
import TasksContext from "./../contexts/Tasks.context";
import { DispatchContext } from "../contexts/Tasks.context";
import { REORDER_TASKS } from "../constants/actions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
  },
}));
// Reorder the list items
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default function Tasks() {
  const classes = useStyles();
  const tasks = useContext(TasksContext);
  const dispatch = useContext(DispatchContext);

  const onDragEnd = (result) => {
    // if item dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );
    // call update state dispatch
    dispatch({ type: REORDER_TASKS, tasks: reorderedTasks });
  };
  return (
    <div className="tasks" align="center">
      <h1>Tasks</h1>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((taskObject, index) => {
                  const {
                    id,
                    isDone,
                    task,
                    notes,
                    pomodorosDone,
                    pomodorosEstimated,
                    isDoing,
                  } = taskObject;
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            key={id}
                            id={id}
                            isDone={isDone}
                            task={task}
                            notes={notes}
                            pomodorosDone={pomodorosDone}
                            pomodorosEstimated={pomodorosEstimated}
                            isDoing={isDoing}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <AddTask />
      </List>
    </div>
  );
}
