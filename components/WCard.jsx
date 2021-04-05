import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { converter } from "../tools/fahrenheitToCelsius";
import { useSelector, useDispatch } from "react-redux";
import { cardCalculator } from "../tools/dataProcess";
import {
  dataSetter,
  focusSetter,
  focusGetter,
  locSetter,
} from "../redux/features/dataSlice";
import Header from "./Header";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    maxWidth: 300,
    minHeight: 150,
  },
  focus: {
    minWidth: 120,
    maxWidth: 400,
    minHeight: 170,
    border: "5px solid black",

    textAlign: "center",
  },

  secondary: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WCard({ isFocus, index, data }) {
  const [state, setState] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  const { short } = useSelector((state) => state.config);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setState(cardCalculator(data));
    } else {
      return;
    }
  }, [data]);

  if (!data) {
    return (
      <Card
        className={isFocus ? classes.focus : classes.root}
        variant={isFocus ? null : "outlined"}
      >
        {/* <Header /> */}
        Placeholder
        {/* TODO: a nice placeholder will come here */}
      </Card>
    );
  }

  return (
    <Card
      className={isFocus ? classes.focus : classes.root}
      variant={isFocus ? null : "outlined"}
    >
      {isDetail ? (
        <CardContent onClick={() => dispatch(focusSetter({ focus: index }))}>
          <Typography
            className={classes.secondary}
            color="textSecondary"
            gutterBottom
          >
            Second Page
          </Typography>
          <Typography variant="h5" component="h2">
            Something
          </Typography>
          <Typography className={classes.secondary} color="textSecondary">
            MIN: <br />
          </Typography>
          <Typography variant="body2" component="p"></Typography>
        </CardContent>
      ) : (
        <CardContent onClick={() => dispatch(focusSetter({ focus: index }))}>
          <Typography
            className={classes.secondary}
            color="textSecondary"
            gutterBottom
          >
            MAX: <br />
            {short === "F"
              ? Math.round(state.max)
              : Math.round(converter(state.max))}
            {short}
          </Typography>
          <Typography variant="h5" component="h2">
            {short === "F"
              ? Math.round(state.avg)
              : Math.round(converter(state.avg))}
            {short}
          </Typography>
          <Typography className={classes.secondary} color="textSecondary">
            MIN: <br />
            {short === "F"
              ? Math.round(state.min)
              : Math.round(converter(state.min))}
            {short}
          </Typography>
          <Typography variant="body2" component="p">
            {state.date}
          </Typography>
        </CardContent>
      )}
      <CardActions onClick={() => setIsDetail(!isDetail)}>
        {isDetail ? (
          <Button size="small">Hide Details</Button>
        ) : (
          <Button size="small">Details</Button>
        )}
      </CardActions>
    </Card>
  );
}
