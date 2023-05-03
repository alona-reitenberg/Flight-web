import video from "../../assets/video.mp4";
import airplane from "../../assets/airplane.png";
import React from "react";
import Search from "../Search/Search";
import "./Main.css";

import { useState, useEffect } from "react";
import { FlightsGrid } from "../FlightGrid/FlightsGrid";

function Main() {
  const [flights, setFlights] = useState([]);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (!flights) {
      console.log("No flights");
    }
  }, [flights]);

  return (
    <div className="main flex container">
      <div className="mainText">Create Amazing Memories With Us</div>
      <div className="mainImages flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop className="video"></video>
          <img src={airplane} alt="airplane" className="plane" />
        </div>
      </div>
      <Search setFlights={setFlights} setAmount={setAmount} amount={amount} />
      <FlightsGrid flights={flights} setFlights={setFlights} amount={amount} />
    </div>
  );
}

export default Main;
