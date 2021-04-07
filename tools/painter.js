const colorProvider = (val, type) => {
  const palette = ["#0c59ac", "#6688b7", "#e8ebf7", "#f1a993", "#ff7f11"];

  if (type === "C") {
    if (val >= 30) {
      return palette[0];
    } else if (val < 30 && val >= 15) {
      return palette[1];
    } else if (val < 15 && val >= 0) {
      return palette[2];
    } else if (val < 0 && val >= -15) {
      return palette[3];
    } else {
      return palette[4];
    }
  } else {
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
  }
};

module.exports = {
  colorProvider,
};
