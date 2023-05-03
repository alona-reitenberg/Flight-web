import { useMemo, useState } from "react";
import { FlightFilters } from "../FlightFilters/FlightFilters";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SingleFlightRow } from "../SingleFlightRow/SingleFlightRow";
import { BsFillPeopleFill } from "react-icons/bs";
import "./FlightsGrid.css";

export const FlightsGrid = ({ flights, setFlights, amount }) => {
  const [filters, setFilters] = useState({
    airlines: [],
    stops: [],
    priceRange: [1, 99999],
  });
  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      let passedFiltering = true;

      if (filters.airlines.length) {
        const airlines = new Set(
          flight.Segments[0].Legs.map((leg) => leg.AirlineName)
        );
        if (flight.Segments.length > 1) {
          flight.Segments.at(-1)
            .Legs.map((leg) => leg.AirlineName)
            .forEach((airline) => {
              airlines.add(airline);
            });
        }

        let found = true;
        for (const airline of airlines) {
          if (!filters.airlines.includes(airline)) {
            found = false;
            break;
          }
        }
        if (!found) {
          passedFiltering = false;
        }
      }

      if (passedFiltering && filters.stops.length) {
        let stops = 0;
        for (const segment of flight.Segments) {
          for (const leg of segment.Legs) {
            stops++;
          }
        }

        passedFiltering = filters.stops.includes(stops - 2);
      }

      if (passedFiltering) {
        passedFiltering =
          flight.Passengers[0].TotalPrice > filters.priceRange[0] &&
          flight.Passengers[0].TotalPrice < filters.priceRange[1];
      }
      return passedFiltering;
    });
  }, [flights, filters]);

  // console.log({
  //   filters,
  //   flightNo: flights.length,
  //   filtered: filteredFlights.length,
  // });

  return (
    <div className="flights-info-container">
      <section className="filters">
        <FlightFilters
          flights={flights}
          setFilters={setFilters}
          filterFlights={filteredFlights.length}
        />
      </section>
      {filteredFlights
        .sort((a, b) =>
          a.Passengers[0].TotalPrice > b.Passengers[0].TotalPrice ? 1 : -1
        )
        .map((flight) => (
          <Container className="container_flight">
            <Row>
              <Col xs={5}>
                <h6 className="titleType">Departing flight</h6>

                <SingleFlightRow
                  flight={flight}
                  key={flight.ID}
                  amount={amount}
                  segment={flight.Segments[0]}
                />
              </Col>

              {flight.Segments.length > 1 ? (
                <Col xs={5}>
                  <h6 className="titleType">Returning flight</h6>
                  <SingleFlightRow
                    flight={flight}
                    key={flight.ID}
                    amount={amount}
                    segment={flight.Segments.at(-1)}
                  />
                </Col>
              ) : null}

              <Col>
                <div className="col details-container">
                  <div className="amount">
                    <BsFillPeopleFill /> {amount} Passangers
                  </div>
                  <h6 className="price">
                    {flight.Passengers[0].TotalPrice * amount}${" "}
                  </h6>
                  <button className="BookButton">Book Now</button>
                </div>
              </Col>
            </Row>
          </Container>
        ))}
    </div>
  );
};
