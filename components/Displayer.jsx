import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { useSelector, useDispatch } from "react-redux";
import Location from "./Location";
import Config from "./Config";
import WCard from "./WCard";
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

  const dispatch = useDispatch();

  return (
    <div>
      <Location city={loc.city} country={loc.country} />
      <Config />
      <Arrows />
      <Grid container direction="row" justify="center" alignItems="stretch">
        {/* {
          length > 0
            ? data.map((i) => (
                <Grid item>
                  <WCard
                    data={i}
                    index={data.indexOf(i)}
                    isFocus={focus === data.indexOf(i) ? true : false}
                  />
                </Grid>
              ))
            : null
          //  TODO: Something useful instead of null
        } */}
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
      {/* {console.table(data)} */}
      {console.table(data)}
      {console.log(length, "length")}
    </div>
  );
}
