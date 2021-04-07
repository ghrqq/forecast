import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { converter } from "../tools/fahrenheitToCelsius";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    maxWidth: 300,
    minHeight: 150,
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
  focus: {
    marginTop: "15px",
    minWidth: 120,
    maxWidth: 400,
    minHeight: 170,
    border: "5px solid black",

    cursor: "pointer",
    textAlign: "center",
  },
  placeHolder: {
    marginTop: "20px",
    minWidth: 100,
    minHeight: 150,
  },

  secondary: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WCardDetail({
  humidity,
  pressure,
  feels,
  visibility,
  isFocus,
  short,
}) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      style={{ textAlign: "center" }}
    >
      <Grid item>
        <Typography className={classes.secondary} color="textSecondary">
          Feels Like:
        </Typography>
        {short === "F" ? Math.round(feels) : Math.round(converter(feels))}
        &deg;
        {short}
      </Grid>
      <Grid item>
        <Typography className={classes.secondary} color="textSecondary">
          Humidty:
        </Typography>
        {humidity} %
      </Grid>
      <Grid item>
        <Typography className={classes.secondary} color="textSecondary">
          Pressure
        </Typography>
        {pressure} bars
      </Grid>

      <Grid item>
        <Typography className={classes.secondary} color="textSecondary">
          Visibility:
        </Typography>
        {visibility} meters
      </Grid>
    </Grid>
  );
}
