import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import directLogo from "./../../assets/nonstop.png";
import arrow from "./../../assets/arrow.svg";
import "./DirectFlight.css";

export const DirectFlight = ({ legs, amount, passengers }) => {
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
            <img src={directLogo} alt="flights logo" className="Flight-logo" />
          </Col>
          <Col>
            <h6>Direct Flight</h6>
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
            <h6>{legs[0].AirlineName}</h6>
          </Col>

          <Col>
            <h6>{legs[0].ArrivalPoint.AirportCode}</h6>
            <div className="smallFont">
              {getFormatDate(legs[0].ArrivalPoint.DateTime)}
            </div>
            <div className="smallFont">
              {getFormatTime(legs[0].ArrivalPoint.DateTime)}
            </div>
          </Col>
        </Row>
      </section>
    </Card>
  );
};
