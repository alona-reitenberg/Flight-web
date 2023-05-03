import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrow from "./../../assets/arrow.svg";
import directLogo from "./../../assets/nonstop.png";
import multiFlightLogo from "./../../assets/multiflight.png";
import "./MultipleFlight.css";

export const MultipleFlight = ({ legs, amount, passengers }) => {
  const [showHideLabel, toggleLabel] = useState("Show Details");
  const lastLegIndex = legs.length;

  const getFormatDate = (date) => {
    var dateFormat = date.slice(0, 10).toString();
    return dateFormat;
  };

  const getFormatTime = (time) => {
    var dateFormat = time.substring(11).toString();
    return dateFormat;
  };

  return (
    <Card>
      <section className="Flight-info">
        <Row>
          <Col>
            <img
              src={multiFlightLogo}
              alt="flights logo"
              className="Flight-logo"
            />
          </Col>
          <Col>
            <h6>Multiple Stops</h6>
          </Col>

          <Col>
            <h6>{legs[0].DeparturePoint.AirportCode}</h6>
            <div className="smallFont">
              {getFormatDate(legs[0].DeparturePoint.DateTime)}
            </div>
            <div className="smallFont">
              {getFormatTime(legs[0].DeparturePoint.DateTime)}
            </div>
          </Col>
          <Col>
            <img className="arrowIcon" src={arrow} alt="RightArrow" />
          </Col>
          <Col>
            <h6>{legs[legs.length - 1].ArrivalPoint.AirportCode}</h6>
            <div className="smallFont">
              {getFormatDate(legs[legs.length - 1].ArrivalPoint.DateTime)}
            </div>
            <div className="smallFont">
              {getFormatTime(legs[legs.length - 1].ArrivalPoint.DateTime)}
            </div>
          </Col>

          <Row>
            <button
              className="DetailsButton"
              onClick={() =>
                toggleLabel(
                  showHideLabel === "Show Details"
                    ? "Hide Details"
                    : "Show Details"
                )
              }
            >
              {showHideLabel}
            </button>
          </Row>
        </Row>

        {showHideLabel === "Hide Details" &&
          legs.map((leg, index) => {
            return (
              <Container className="FlightDetails">
                <Row>
                  <Col>
                    <img
                      src={directLogo}
                      alt="flights logo"
                      className="Flight-logo"
                    />
                  </Col>
                  <Col>
                    <h6>{leg.DeparturePoint.AirportCode}</h6>
                    <div className="smallFont">
                      {getFormatDate(leg.DeparturePoint.DateTime)}
                    </div>
                    <div className="smallFont">
                      {getFormatTime(leg.DeparturePoint.DateTime)}
                    </div>
                  </Col>
                  <Col>
                    <img className="arrowIcon" src={arrow} alt="RightArrow" />
                  </Col>
                  <Col>
                    <h6>{leg.ArrivalPoint.AirportCode}</h6>
                    <div className="smallFont">
                      {getFormatDate(leg.ArrivalPoint.DateTime)}
                    </div>
                    <div className="smallFont">
                      {getFormatTime(leg.ArrivalPoint.DateTime)}
                    </div>
                  </Col>
                  <Col>
                    <h6>{leg.AirlineName}</h6>
                  </Col>
                </Row>
                {lastLegIndex !== index + 1 ? (
                  <Row className="layover-info">Layover</Row>
                ) : (
                  <div></div>
                )}
              </Container>
            );
          })}
      </section>
    </Card>
  );
};
