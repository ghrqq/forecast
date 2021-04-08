const colorProvider = (val) => {
  const palette = ["#8dc0f7", "#4096f2", "#0c59ac", "#ff9233", "#f57200"];

  // Default unit is fixed to "imperial" on API calls. Assessing the color for fahrenheit is enough.

  if (val >= 86) {
    return palette[0];
  } else if (val < 86 && val >= 49) {
    return palette[1];
  } else if (val < 49 && val >= 32) {
    return palette[2];
  } else if (val < 32 && val >= 5) {
    return palette[3];
  } else {
    return palette[4];
  }
};

module.exports = {
  colorProvider,
};
