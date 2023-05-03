const { loadFlight } = require("./flight_model");
const express = require("express");
const app = express();
const cors = require("cors");
const { flightsRouters } = require("./router/flight-router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = require("http").createServer(app);
const PORT = 5001;
server.listen(PORT, () => {
  console.log("Listening to port", PORT);
});

app.use("/api/flights", flightsRouters);
app.get("/", (req, res) => res.send(console.log("server is running!")));
