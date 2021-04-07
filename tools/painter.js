const colorProvider = (val, type) => {
  const palette = ["#8dc0f7", "#4096f2", "#0c59ac", "#ff9233", "#f57200"];

  if (val >= 86) {
    return palette[0];
  } else if (val < 86 && val >= 59) {
    return palette[1];
  } else if (val < 59 && val >= 32) {
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
