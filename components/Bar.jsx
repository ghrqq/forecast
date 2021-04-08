import React from "react";

// Material
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// Redux
import { useSelector } from "react-redux";

// Tools
import { converter } from "../tools/fahrenheitToCelsius";

// Components
import IconSelector from "./IconSelector";

const useStyles = makeStyles({
  root: {
    color: "#fff",
    textAlign: "center",
    marginTop: "30px",
    padding: "2px",
    minWidth: "20px",
    backgroundColor: "#3f50b5",
  },
  time: {
    fontSize: "14px",
  },
});

export default function Bar({ code, val, time }) {
  const { short } = useSelector((state) => state.config);
  const classes = useStyles();
  return (
    <>
      <Card
        style={{ height: val * 2 }}
        variant="outlined"
        className={classes.root}
      >
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            {short === "F" ? Math.round(val) : Math.round(converter(val))}&deg;
            {short}
          </Grid>
          <Grid item>
            <IconSelector code={code} isBar={true} />
          </Grid>
        </Grid>
      </Card>
      <Typography className={classes.time}>{time.slice(0, 5)}</Typography>
    </>
  );
}
