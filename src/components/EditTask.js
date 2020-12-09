import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { DispatchContext } from "./../contexts/Tasks.context";
import { useForm } from "react-hook-form";
import { EDIT_TASK, REMOVE_TASK } from "./../constants/actions";
const useStyles = makeStyles((theme) => ({
  editForm: {
    marginBottom: 15,
  },
}));
function EditTask({ id, handleEdit, task, notes, pomodorosEstimated }) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const { register, handleSubmit } = useForm();

  const handleDelete = () => {
    dispatch({ type: REMOVE_TASK, id });
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch({
      type: EDIT_TASK,
      id,
      task: data.task,
      notes: data.notes,
      pomodorosEstimated: data.pomodorosEstimated,
    });
    handleEdit();
  };
  return (
    <Card className={classes.editForm}>
      <CardHeader title="Edit Task" />
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        id="EditTaskForm"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Task"
                name="task"
                variant="outlined"
                autoFocus
                required
                fullWidth
                inputRef={register}
                defaultValue={task}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                type="number"
                id="standard-multiline-flexible"
                label="Pomodoros Est."
                name="pomodorosEstimated"
                variant="outlined"
                fullWidth
                required
                inputRef={register}
                defaultValue={pomodorosEstimated}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-multiline-flexible"
                label="Notes"
                name="notes"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                inputRef={register}
                defaultValue={notes}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDelete}
            edge="start"
          >
            Delete
          </Button>
          <Button color="primary" variant="outlined" onClick={handleEdit}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default EditTask;
