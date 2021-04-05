const dateGroupper = (arr) => {
  let groupped = [];
  let days = [];

  // The response of the API is an array of 40 entries.
  // These 40 entries may belong 5 or 6 different dates.
  // In order to organize days properly, we should be able to tell how many days are in the array.
  // Function below adds different dates to an array. (days)

  arr.forEach((i) => {
    if (days.indexOf(i.dt_txt.split(" ")[0]) < 0) {
      days.push(i.dt_txt.split(" ")[0]);
    }
  });

  // Since we will use values for every date in bar chart, we may group the data by days beforehand.
  // When we know the exact number of days we can group them by date.
  for (let i = 0; i < days.length; i++) {
    groupped[i] = arr.filter((j) => j.dt_txt.split(" ")[0] === days[i]);
  }

  return groupped;
};

const cardCalculator = (arr) => {
  const temp = {};
  const mains = arr.map((i) => i.main);

  temp.avg = mains.map((j) => j.temp).reduce((a, b) => a + b, 0) / arr.length;

  temp.min = mains.map((j) => j.temp_min).sort((a, b) => a - b)[0];
  temp.max = mains.map((j) => j.temp_max).sort((a, b) => b - a)[0];
  temp.date = arr[0].dt_txt.split(" ")[0];

  return temp;
};

module.exports = {
  dateGroupper,
  cardCalculator,
};
