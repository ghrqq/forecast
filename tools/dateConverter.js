const dateConverter = (dt) => {
  const d = dt * 1000;
  const day = new Date(d).toLocaleString("en-us", { weekday: "long" });
  return day;
};

module.exports = {
  dateConverter,
};
