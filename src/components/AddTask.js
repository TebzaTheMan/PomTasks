import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import { Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { DispatchContext } from "./../contexts/Tasks.context";
import useInputState from "./../hooks/useInputState";
import { ADD_TASK } from "../constants/actions";
export default function AddTask() {
  const dispatch = useContext(DispatchContext);
  const [showaddForm, setAddForm] = useState(false);
  const [task, handleTask, clearTask] = useInputState();
  const [notes, handleNotes, clearNotes] = useInputState();
  const [pomEstimated, handlePomEstimated, clearPomEstimated] = useInputState(
    1
  );

  const handleClick = () => {
    setAddForm(!showaddForm);
  };
  const handleAdd = () => {
    dispatch({
      type: ADD_TASK,
      task: task,
      notes: notes,
      pomodorosEstimated: pomEstimated,
    });
    clearPomEstimated();
    clearTask();
    clearNotes();
    handleClick();
  };
  const addForm = () => {
    return (
      <Card>
        <CardHeader title="Add New Task" />
        <CardContent>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="Task"
                  variant="outlined"
                  autoFocus
                  required
                  fullWidth
                  name="description"
                  value={task}
                  onChange={handleTask}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="number"
                  id="standard-multiline-flexible"
                  label="Pomodoros Est."
                  variant="outlined"
                  fullWidth
                  required
                  value={pomEstimated}
                  onChange={handlePomEstimated}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-multiline-flexible"
                  label="Notes"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={notes}
                  onChange={handleNotes}
                  placeholder="some extra info that you wanna add"
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="outlined" onClick={handleClick}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleAdd}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    );
  };
  return (
    <div>
      {showaddForm ? (
        addForm()
      ) : (
        <Button
          color="primary"
          fullWidth
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleClick}
          size="large"
        >
          Add Task
        </Button>
      )}
    </div>
  );
}
