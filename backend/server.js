import express from "express";
import cors from "cors";

const app = express();

const rideRequests = [];

app.use(express.json());

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  }),
);

app.get("/", (req, res) => {
  console.log("GET / route was reached!");
  res.status(200).send("JUST RIDE BACKEND IS WORKING!");
});

app.get("/rides", (req, res) => {
  res.json([
    { name: "Raju", from: "Narsingi", to: "Mehdipatnam", fare: 35 },
    { name: "Arjun", from: "Narsingi", to: "Ibrahim Bagh", fare: 30 },
    { name: "Kiran", from: "Narsingi", to: "Mehdipatnam", fare: 40 },
  ]);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "JustRide backend is healthy",
  });
});

app.get("/ride-requests", (req, res) => {
  res.status(200).json(rideRequests);
});

app.post("/ride-requests", (req, res) => {
  const { passengerName, from, to } = req.body;

  if (!passengerName.trim() || !from.trim() || !to.trim()) {
    return res.status(400).json({
      success: false,
      message: "Passenger name, pickup, and destination are required",
    });
  }
  const newRequest = { passengerName, from, to };
  rideRequests.push(newRequest);

  res.status(201).json({
    success: true,
    message: "Ride request submitted successfully!",
    request: newRequest,
  });
});

app.listen(3000, () => {
  console.log("JustRide server running on port 3000");
});
