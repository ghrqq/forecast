import React, { useState, useEffect } from "react";

// Material
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DetailsIcon from "@material-ui/icons/Details";
import Tooltip from "@material-ui/core/Tooltip";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { focusSetter } from "../redux/features/dataSlice";
// Tools
import { converter } from "../tools/fahrenheitToCelsius";
import { cardCalculator } from "../tools/dataProcess";
import { colorProvider } from "../tools/painter";
import { dateConverter } from "../tools/dateConverter";

// Components
import IconSelector from "./IconSelector";
import WindDisplayer from "./WindDisplayer";
import WCardDetail from "./WCardDetail";
import PlaceHolder from "./PlaceHolder";

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
    border: "2px solid black",

    cursor: "pointer",
    textAlign: "center",
  },
  placeHolder: {
    marginTop: "20px",
    minWidth: 100,
    minHeight: 150,
    outline: "none",
    verticalAlign: "center",
  },

  secondary: {
    fontSize: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: "#f5f5f5",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WCard({ isFocus, index, data }) {
  const [state, setState] = useState({}); // Store the processed data locally.
  const [isDetail, setIsDetail] = useState(false); // Display back side of card.
  const { short } = useSelector((state) => state.config); // Unit type
  const matches = useMediaQuery("(min-width:600px)"); // Card size and spacing in smaller screens.
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // Process the data for the card and return displayable values when component loads or data changes.
    if (data) {
      setState(cardCalculator(data));
    } else {
      return;
    }
  }, [data]);

  if (!data) {
    // In case of missing data or a date range is out of the current data display a placeholder.
    return <PlaceHolder />;
  }

  return (
    <Card
      className={isFocus ? classes.focus : classes.root}
      variant={isFocus ? null : "outlined"}
      style={{
        minWidth: matches ? "150px" : null,
      }}
    >
      <Tooltip title={state.date ? state.date : "date"}>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {index === 0
            ? "Today"
            : index === 1
            ? "Tomorrow"
            : dateConverter(data[0].dt)}
        </Typography>
      </Tooltip>

      {/* Icon Selector uses index "0" as it is the most recent data or the first data of the day. */}
      <IconSelector
        code={data[0].weather[0].icon}
        title={data[0].weather[0].description}
        matches={matches}
      />

      {isDetail ? (
        // Back of the Weather card
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
        <CardContent
          style={{ padding: matches ? null : "1px" }}
          onClick={() => dispatch(focusSetter({ focus: index }))}
        >
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
              padding: matches ? "10px" : "2px",
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
          {/* <Typography
            variant="body2"
            component="p"
            style={{ fontSize: "10px" }}
          >
            {state.date}
          </Typography> */}
          {/* Wind Displayer */}
          <WindDisplayer
            matches={matches}
            angle={data[0].wind.deg}
            speed={data[0].wind.speed}
          />
        </CardContent>
      )}
      <CardActions
        onClick={() => setIsDetail(!isDetail)}
        style={{ margin: "0 auto", backgroundColor: "#f5f5f5" }}
      >
        <Tooltip title="Details">
          <DetailsIcon />
        </Tooltip>
        {/* In order to preserve the same look for a wide variety of screen sizes (>359px) button description is removed when the screen is smaller than 600px */}
        {matches ? "Details" : null}
      </CardActions>
    </Card>
  );
}
