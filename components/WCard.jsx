import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { converter } from "../tools/fahrenheitToCelsius";
import { useSelector, useDispatch } from "react-redux";
import { cardCalculator } from "../tools/dataProcess";
import { colorProvider } from "../tools/painter";
import {
  dataSetter,
  focusSetter,
  focusGetter,
  locSetter,
} from "../redux/features/dataSlice";
import Header from "./Header";
import IconSelector from "./IconSelector";
import WindDisplayer from "./WindDisplayer";
import WCardDetail from "./WCardDetail";

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

export default function WCard({ isFocus, index, data }) {
  const [state, setState] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  const { short } = useSelector((state) => state.config);
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:600px)");

  //   const colorProvider = (val, type) => {
  //       const palette = ["#e66735", "#c6845b" , "#a5a181", "#74ccb9" , "#54e9df"]
  //       const range ={C: [30, 15, 0, -15, -30], F: [86, 59, 32, 5, -22] };

  //   }

  useEffect(() => {
    if (data) {
      setState(cardCalculator(data));
    } else {
      return;
    }
  }, [data]);

  if (!data) {
    return (
      <Card className={classes.placeHolder}>
        <Header />

        {/* TODO: a nice placeholder will come here */}
      </Card>
    );
  }

  return (
    <Card
      className={isFocus ? classes.focus : classes.root}
      variant={isFocus ? null : "outlined"}
      style={{ minWidth: matches ? "150px" : null }}
    >
      <IconSelector
        code={data[0].weather[0].icon}
        title={data[0].weather[0].description}
      />
      {isDetail ? (
        <CardContent onClick={() => dispatch(focusSetter({ focus: index }))}>
          <WCardDetail
            humidity={state.humidity}
            pressure={state.pressure}
            feels={state.feels}
            visibility={state.visibility}
            isFocus={isFocus}
            short={short}
          />
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
            &deg;
            {short}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            style={{
              backgroundColor: colorProvider(state.avg, short),
              color: "#fff",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {short === "F"
              ? Math.round(state.avg)
              : Math.round(converter(state.avg))}
            &deg;
            {short}
          </Typography>
          <Typography className={classes.secondary} color="textSecondary">
            MIN: <br />
            {short === "F"
              ? Math.round(state.min)
              : Math.round(converter(state.min))}
            &deg;
            {short}
          </Typography>
          <Typography variant="body2" component="p">
            {state.date}
          </Typography>
        </CardContent>
      )}
      <CardActions onClick={() => setIsDetail(!isDetail)}>
        {isDetail ? (
          <Button size="small">General</Button>
        ) : (
          <Button size="small">Details</Button>
        )}
        <WindDisplayer angle={data[0].wind.deg} speed={data[0].wind.speed} />
      </CardActions>
    </Card>
  );
}
