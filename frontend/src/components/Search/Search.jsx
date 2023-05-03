import React, { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./Search.css";

function Search({ setFlights, amount, setAmount }) {
  const [airports, setAirports] = useState([]);
  const [from, setFrom] = useState("TLV");
  const [to, setTo] = useState("AMS");
  const [date, setDate] = useState([]);
  const fetchAirports = async () => {
    try {
      //get airport autocomplete list
      const response = await fetch(
        "http://localhost:5001/api/flights/airports"
      );
      const airports = await response.json();
      setAirports(airports);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!from) {
      return alert("Please pick from where you want to flight");
    }
    if (!to) {
      return alert("Please pick to where you want to flight");
    }
    if (!date) {
      return alert("Please pick The Date");
    }
    if (amount < 1 || !amount) {
      return alert("Invalid Amount");
    }

    const query = {
      from,
      to,
      date: [formatDate(new Date(date[0])), formatDate(new Date(date[1]))],
    };
    // console.log(query);
    try {
      //send the input to the server so send you back the found flights
      const response = await fetch("http://localhost:5001/api/flights/search", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
      const flights = await response.json();
      setFlights(flights);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div className="searchInput flex">
          <form className="flex" onSubmit={handleSubmit}>
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>From</h4>
              <input
                name="from"
                list="airports"
                type="text"
                placeholder="Select Location"
                onChange={(e) => setFrom(e.target.value)}
                value={from}
              ></input>
              <datalist id="airports">
                {airports.map((airport) => {
                  return <option value={airport} key={airport}></option>;
                })}
              </datalist>
            </div>
            <div className="singleInput flex">
              <div className="iconDiv">
                <HiOutlineLocationMarker className="icon" />
              </div>
              <div className="texts">
                <h4>To</h4>
                <input
                  name="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  list="airports"
                  type="text"
                  placeholder="Select Location"
                />
              </div>
            </div>
            <div className="singleInput flex">
              <div className="iconDiv">
                <RxCalendar className="icon" />
              </div>
              <div className="texts">
                <h4>Date</h4>
                <DateRangePicker
                  format="dd-MM-yyyy"
                  placeholder="Pick a Date Range"
                  appearance="subtle"
                  value={date}
                  onChange={(date) => setDate(date)}
                ></DateRangePicker>
              </div>
            </div>
            <div className="singleInput flex">
              <div className="iconDiv">
                <RiAccountPinCircleLine className="icon" />
              </div>
              <div className="texts">
                <h4>Amount</h4>
                <input
                  type="number"
                  placeholder="Passengers"
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                />
              </div>
            </div>
            <button className="btnSearch btnBlock flex">Search Flight</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
