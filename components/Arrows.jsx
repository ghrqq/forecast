import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { focusMover } from "../redux/features/dataSlice";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    fontSize: 50,
    color: "#fff",
    backgroundColor: "#3f50b5",
    borderRadius: 10,
    cursor: "pointer",
  },
});

export default function Arrows() {
  const { length, focus } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          {focus - 1 < 0 ? null : (
            <ArrowBackIcon
              className={classes.root}
              onClick={() => dispatch(focusMover({ direction: -1 }))}
            />
          )}
        </Grid>
        <Grid item>
          {focus + 1 == length ? null : (
            <ArrowForwardIcon
              className={classes.root}
              onClick={() => dispatch(focusMover({ direction: +1 }))}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
