const converter = (nam) => {
  // Default unit is fixed to "imperial" on API calls. Converting fahrenheit to celsius is enough.

  return ((nam - 32) * 5) / 9;
};

module.exports = {
  converter,
};
