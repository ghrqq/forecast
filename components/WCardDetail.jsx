import React from "react";
// Material
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Tools
import { converter } from "../tools/fahrenheitToCelsius";

const useStyles = makeStyles({
  secondary: {
    fontSize: 12,
  },
});

export default function WCardDetail({
  humidity,
  pressure,
  feels,
  visibility,

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
