import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { finish, update } from "../redux/features/loaderSlice";
import { dataSetter, locSetter } from "../redux/features/dataSlice";
import { dateGroupper } from "../tools/dataProcess";
import axios from "axios";
// import { locFinder } from "../tools/locFinder";

export default function Loader() {
  const { msg, process } = useSelector((state) => state.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos) => {
      dispatch(update({ val: 25, msg: "Location founded." }));

      axios({
        method: "get",
        url: `https://api.openweathermap.org/geo/1.0/reverse?lat=${
          pos.coords.latitude
        }&lon=${pos.coords.longitude}&limit=${1}&appid=${process.env.ApiKey}`,
      }).then((res) => {
        dispatch(
          update({
            val: 25,
            msg: `Nearest city is ${res.data[0].name} and we are fetching information for you.`,
          })
        );
        dispatch(
          locSetter({
            loc: {
              city: res.data[0].name,
              country: res.data[0].country,
            },
          })
        );
        axios({
          method: "get",
          url: `https://api.openweathermap.org/data/2.5/forecast?q=${res.data[0].name},${res.data[0].country}&APPID=${process.env.ApiKey}&units=imperial`,
        }).then((res) => {
          if (res.status === 200) {
            dispatch(
              update({
                val: 25,
                msg:
                  "We got all the data we need. Just preparing it for your pleasure.",
              })
            );
            dispatch(dataSetter({ data: dateGroupper(res.data.list) }));
            setTimeout(() => {
              dispatch(finish());
            }, 1000);
          }
        });
      });

      return;
    };
    const error = (err) => {
      if (err.code === 1) {
        dispatch(
          update({
            val: 50,
            msg:
              "It's a weather app and it needs to know your location to work properly. Nevertheless, we respect your privacy and you may enjoy this app with a location of our choice.",
          })
        );
        axios({
          method: "get",
          url: `https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=${process.env.ApiKey}&units=imperial`,
        }).then((res) => {
          if (res.status === 200) {
            dispatch(dataSetter({ data: dateGroupper(res.data.list) }));
            setTimeout(() => {
              dispatch(finish());
            }, 1000);
            dispatch(
              locSetter({
                loc: {
                  city: "Munich",
                  country: "Germany",
                },
              })
            );
          }
        });
      } else {
        dispatch(
          update({
            val: 10,
            msg:
              "It seems we have a problem with finding your coordinates. Do not worry. We will try another way.",
          })
        );
        axios({
          method: "get",
          url: `https://geolocation-db.com/json/${process.env.geolocKey}`,
        }).then((res) => {
          if (res.status === 200) {
            dispatch(
              update({
                val: 10,
                msg:
                  "We have got your location and trying to find nearest city to you.",
              })
            );
            axios({
              method: "get",
              url: `https://api.openweathermap.org/geo/1.0/reverse?lat=${
                res.data.latitude
              }&lon=${res.data.longitude}&limit=${5}&appid=${
                process.env.ApiKey
              }`,
            }).then((res) => {
              dispatch(
                update({
                  val: 25,
                  msg: `Nearest city is ${res.data[0].name} and we are fetching information for you.`,
                })
              );
              dispatch(
                locSetter({
                  loc: {
                    city: res.data[0].name,
                    country: res.data[0].country,
                  },
                })
              );
              axios({
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/forecast?q=${res.data[0].name},${res.data[0].country}&APPID=${process.env.ApiKey}&units=imperial`,
              }).then((res) => {
                if (res.status === 200) {
                  dispatch(
                    update({
                      val: 25,
                      msg:
                        "We got all the data we need. Just preparing it for your pleasure.",
                    })
                  );
                  dispatch(dataSetter({ data: dateGroupper(res.data.list) }));
                  setTimeout(() => {
                    dispatch(finish());
                  }, 1000);
                }
              });
            });
          }
        });
      }
    };

    // To check if the navigator is defined.
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.onLine !== "undefined"
    ) {
      const res = navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
      );
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>{/* <Header /> */}</Grid>

        <Grid item>
          <h5>{msg} </h5>
        </Grid>
      </Grid>

      <LinearProgress
        style={{ marginTop: "20px" }}
        variant="determinate"
        value={process}
      />
    </Container>
  );
}
