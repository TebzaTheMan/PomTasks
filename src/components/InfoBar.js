import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    width: "100%",
    maxWidth: 600,
    padding: 30,
    marginBottom: 30,
  },
}));

function InfoBar() {
  const classes = useStyles();
  return (
    <div align="center">
      <Paper className={classes.root} elevation={2} square>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h5">
              Est: <span>6</span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Act: <span>6</span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Finish at <span>19:02</span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default InfoBar;
