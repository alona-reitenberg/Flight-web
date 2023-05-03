import { CheckPicker } from "rsuite";
import { RangeSlider } from "rsuite";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./FlightFilters.css";
import { useMemo } from "react";

export const FlightFilters = ({ flights, setFilters, filterFlights }) => {
  const { stopOptions, airlineOptions, minPrice, maxPrice } = useMemo(() => {
    const stops = new Set();
    const airlines = new Set();
    const prices = [];

    for (const flight of flights) {
      const legs = flight.Segments[0].Legs;
      stops.add(legs.length - 1);
      legs.forEach((leg) => {
        airlines.add(leg.AirlineName);
      });
      prices.push(flight.Passengers[0].TotalPrice);
    }

    return {
      stopOptions: [...stops]
        .sort()
        .map((item) => ({ label: item, value: item })),
      airlineOptions: [...airlines].sort().map((item) => ({
        label: item,
        value: item,
      })),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [flights]);

  return (
    <Row className="justify-content-start">
      <Col>
        <CheckPicker
          label="Airlines"
          data={airlineOptions}
          style={{ width: 224 }}
          onChange={(airlines) =>
            setFilters((prevFilters) => ({ ...prevFilters, airlines }))
          }
        />
      </Col>

      <Col>
        <CheckPicker
          label="Number of Stops"
          data={stopOptions}
          style={{ width: 224 }}
          onChange={(stops) =>
            setFilters((prevFilters) => ({ ...prevFilters, stops }))
          }
        />
      </Col>

      <Col>
        <label>Price Range </label>

        <RangeSlider
          style={{ marginTop: 10 }}
          min={minPrice || 0}
          max={maxPrice || 9999}
          defaultValue={[minPrice || 0, maxPrice || 9999]}
          onChange={(priceRange) =>
            setFilters((prevFilters) => ({ ...prevFilters, priceRange }))
          }
        />
      </Col>

      <Col>
        <div className="flights-found">{filterFlights} Flights are found</div>
      </Col>
    </Row>
  );
};
