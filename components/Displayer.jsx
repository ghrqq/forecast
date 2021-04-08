import React from "react";

// Material
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { useSelector } from "react-redux";

// Components
import Location from "./Location";
import Config from "./Config";
import WCard from "./WCard";
import Bar from "./Bar";
import Arrows from "./Arrows";

export default function Displayer() {
  const { focus, length, loc, data } = useSelector((state) => state.data); // Relevant initial state from Redux.

  const matches = useMediaQuery("(min-width:450px)");

  return (
    <Container maxWidth="sm">
      <Location city={loc.city} country={loc.country} /> {/* Location chip */}
      <Config /> {/* Unit converter */}
      <Arrows /> {/* Arrows to choose the focus day. */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={matches ? 1 : 0}
      >
        {length > 0 ? ( // To prevent from crashing in case of missing or broken data.
          <>
            <Grid item>
              <WCard data={data[focus - 1]} index={focus - 1} isFocus={false} />
            </Grid>
            <Grid item>
              <WCard data={data[focus]} index={focus} isFocus={true} />
            </Grid>
            <Grid item>
              <WCard data={data[focus + 1]} index={focus + 1} isFocus={false} />
            </Grid>
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
        spacing={matches ? 1 : 0}
      >
        {" "}
        {/* Displayin bars according to the selected day's dataset. Since the data may include 1 to 8 sets, using map is required. */}
        {data[focus].map((i) => (
          <Grid item key={i.dt}>
            <Bar
              code={i.weather[0].icon}
              val={i.main.temp}
              time={i.dt_txt.split(" ")[1]}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
