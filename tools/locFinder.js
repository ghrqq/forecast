import axios from "axios";

const ApiKey = "75f972b80e26f14fe6c920aa6a85ad57&cnt=40"; // TODO: This should go to process.env

const locFinder = () => {
  // Options for navigator geolocation
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // This function will run in case of a successfull attempt to get coordinates.
  const success = (pos) => {
    let info = [];
    console.log(pos, "pos founded");
    return pos;

    // Free version of the API allows us to make a querry only with a proper city name and country code but the outcome of geoloc, is latitude and longitude.
    // Luckily we can use the same API to find closest city to given coordinates.
    // First request will GET the closest city and its country to given coordinates.
    // Second request will GET the actual data with the returned city name and country code.
    axios({
      method: "get",
      url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${
        pos.coords.latitude
      }&lon=${pos.coords.longitude}&limit=${1}&appid=${ApiKey}`,
    }).then((res) => {
      axios({
        method: "get",
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${res.data[0].name},${res.data[0].country}&APPID=${ApiKey}`,
      }).then((res) => (info = res));
    });

    return info;
  };
  // This will be fired in case of error.
  // TODO: Better error handling?
  const error = (err) => {
    console.log(err, "error");
    return err;
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
};

module.exports = {
  locFinder,
};
