import React, { useEffect } from "react";
import axios from "axios";

// Material
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { finish, update } from "../redux/features/loaderSlice";
import { dataSetter, locSetter } from "../redux/features/dataSlice";
// Components
import Header from "./Header";
// Tols
import { dateGroupper } from "../tools/dataProcess";

export default function Loader() {
  const { msg, progress } = useSelector((state) => state.loader);

  const dispatch = useDispatch();

  useEffect(() => {
    // This function will try to get user's location from browser.
    // If user does not allow us to get location, it will show Munich's forecast by default.
    // If user allows, but an error occurs, it will make an API Call to a Geoloc DB
    // Once we have the coordinates an API call will be made to OpenWeather API to get the closest city's name and country code.
    //

    const options = {
      // Options for navigator geolocation
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = (pos) => {
      // This function will run in case of a successfull attempt to get coordinates.
      dispatch(update({ val: 25, msg: "Location founded." }));
      // Free version of the API allows us to make a querry only with a proper city name and country code but the outcome of geoloc, is latitude and longitude.
      // Luckily we can use the same API to find closest city to given coordinates.
      // First request will GET the closest city and its country to given coordinates.
      // Second request will GET the actual data with the returned city name and country code.
      axios({
        method: "get",
        url: `https://api.openweathermap.org/geo/1.0/reverse?lat=${
          pos.coords.latitude
        }&lon=${pos.coords.longitude}&limit=${1}&appid=${
          process.env.NEXT_PUBLIC_ApiKey
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
          url: `https://api.openweathermap.org/data/2.5/forecast?q=${res.data[0].name},${res.data[0].country}&APPID=${process.env.NEXT_PUBLIC_ApiKey}&units=imperial`,
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
            // Sets the data
            setTimeout(() => {
              // Message display duration. Then changes load state
              dispatch(finish());
            }, 1000);
          }
        });
      });

      return;
    };
    const error = (err) => {
      // This will be fired in case of error.
      // If user does not allow us to get the location, a custom forecast will be fetched.
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
          url: `https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=${process.env.NEXT_PUBLIC_ApiKey}&units=imperial`,
        }).then((res) => {
          if (res.status === 200) {
            dispatch(dataSetter({ data: dateGroupper(res.data.list) })); // Sets the data
            setTimeout(() => {
              dispatch(finish()); // Message display duration. Then changes load state
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
        // If user consents but an error occurs, will try GeoLoc DB
        dispatch(
          update({
            val: 10,
            msg:
              "It seems we have a problem with finding your coordinates. Do not worry. We will try another way.",
          })
        );
        axios({
          method: "get",
          url: `https://geolocation-db.com/json/${process.env.NEXT_PUBLIC_geoLocKey}`,
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
                process.env.NEXT_PUBLIC_ApiKey
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
                url: `https://api.openweathermap.org/data/2.5/forecast?q=${res.data[0].name},${res.data[0].country}&APPID=${process.env.NEXT_PUBLIC_ApiKey}&units=imperial`,
              }).then((res) => {
                if (res.status === 200) {
                  dispatch(
                    update({
                      val: 25,
                      msg:
                        "We got all the data we need. Just preparing it for your pleasure.",
                    })
                  );
                  dispatch(dataSetter({ data: dateGroupper(res.data.list) })); // Sets the data
                  setTimeout(() => {
                    // Message display duration. Then changes load state
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
        <Grid item>
          <Header />
        </Grid>

        <Grid item>
          <h5>{msg} </h5>
        </Grid>
      </Grid>

      <LinearProgress
        style={{ marginTop: "20px" }}
        variant="determinate"
        value={progress}
      />
    </Container>
  );
}
