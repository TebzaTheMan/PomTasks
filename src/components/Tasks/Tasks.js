/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import AddTask from './AddTask';
import TasksContext, { DispatchContext } from '../../contexts/Tasks.context';

import { REORDER_TASKS } from '../../constants/actions';

const useStyles = makeStyles(() => ({
  root: {
    width: '97%',
    maxWidth: 500,
  },
  taskHeading: {
    marginTop: 10,
    fontSize: '55px',
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
      result.destination.index,
    );
    dispatch({ type: REORDER_TASKS, tasks: reorderedTasks });
  };
  return (
    <div className="tasks" align="center">
      <Typography variant="h1" className={classes.taskHeading}>
        Tasks
      </Typography>
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
                      {(providedDrag) => (
                        <div
                          ref={providedDrag.innerRef}
                          {...providedDrag.draggableProps}
                          {...providedDrag.dragHandleProps}
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
      </List>
      <AddTask />
    </div>
  );
}
