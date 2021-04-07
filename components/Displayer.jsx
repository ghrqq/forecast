import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import Location from "./Location";
import Config from "./Config";
import WCard from "./WCard";
import Bar from "./Bar";

import Arrows from "./Arrows";

import {
  dataSetter,
  focusSetter,
  focusGetter,
  locSetter,
} from "../redux/features/dataSlice";
import { typeSetter } from "../redux/features/configSlice";

export default function Displayer() {
  const { focus, length, loc, data } = useSelector((state) => state.data);
  const { unit, short } = useSelector((state) => state.config);
  const matches = useMediaQuery("(min-width:450px)");
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm">
      <Location city={loc.city} country={loc.country} />
      <Config />
      <Arrows />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={matches ? 1 : 0}
      >
        {
          length > 0 ? (
            <>
              <Grid item>
                <WCard
                  data={data[focus - 1]}
                  index={focus - 1}
                  isFocus={false}
                />
              </Grid>
              <Grid item>
                <WCard data={data[focus]} index={focus} isFocus={true} />
              </Grid>
              <Grid item>
                <WCard
                  data={data[focus + 1]}
                  index={focus + 1}
                  isFocus={false}
                />
              </Grid>
            </>
          ) : null
          //  TODO: Something useful instead of null
        }
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
        spacing={matches ? 1 : 0}
      >
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
