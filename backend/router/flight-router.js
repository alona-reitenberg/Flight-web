const { Router } = require("express");
const { flightsData } = require("../flight_model");
const flightsRouters = new Router();

flightsRouters.post("/search", (req, res) => {
  const { from, to, date } = req.body;
  const dateCheckIn = date[0].slice(0, 10);
  const dateCheckOut = date[1].slice(0, 10);
  const flights = [];
  flightsData.map((flight) => {
    if (
      flight.Segments[0].Legs[0].DeparturePoint.AirportCode === from &&
      flight.Segments[0].Legs[0].DeparturePoint.DateTime.includes(
        dateCheckIn
      ) &&
      flight.Segments[0].Legs.at(-1).ArrivalPoint.AirportCode === to
    ) {
      if (
        flight.Segments.at(-1).Legs[0].DeparturePoint.AirportCode === to &&
        flight.Segments.at(-1).Legs[0].DeparturePoint.DateTime.includes(
          dateCheckOut
        ) &&
        flight.Segments.at(-1).Legs.at(-1).ArrivalPoint.AirportCode === from
      ) {
        flights.push(flight);
      }
    }
  });

  console.log("flights num:", flights.length);
  res.json(flights);
});

flightsRouters.get("/airports", (req, res) => {
  const airports = new Set();
  flightsData.map((flight) =>
    flight.Segments.map((segment) =>
      segment.Legs.map((leg) => {
        airports.add(leg.DeparturePoint.AirportCode);
        airports.add(leg.ArrivalPoint.AirportCode);
      })
    )
  );

  res.json(Array.from(airports));
});

module.exports = { flightsRouters };
