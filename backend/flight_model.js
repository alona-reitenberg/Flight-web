const { readFileSync } = require("fs");

const flightsData = [
  ...JSON.parse(readFileSync("./Data/Raw_data RT - 2pax .json")),
];

let loadFlight = () => flightsData;

module.exports = { loadFlight, flightsData };
