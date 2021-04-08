const colorProvider = (val) => {
  // Default unit is fixed to "imperial" on API calls. Also, Celsius conversion works only when displaying. Assessing the color for fahrenheit is enough.
  const palette = [
    "#70f5ff",
    "#64d6de",
    "#57b7bd",
    "#2cabd9",
    "#009ff5",
    "#0077cc",
    "#ff9100",
    "#ff8500",
    "#ff7900",
    "#ff6d00",
  ];

  const ranges = [
    { min: -9999, max: 5 },
    { min: 5, max: 15 },
    { min: 15, max: 25 },
    { min: 25, max: 35 },
    { min: 35, max: 45 },
    { min: 45, max: 55 },
    { min: 55, max: 65 },
    { min: 65, max: 75 },
    { min: 75, max: 85 },
    { min: 85, max: 9999 },
  ];

  return palette[
    ranges.indexOf(ranges.filter((i) => val >= i.min && val <= i.max)[0])
  ];
};

module.exports = {
  colorProvider,
};
