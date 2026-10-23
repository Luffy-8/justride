import express from "express";
import cors from "cors";

const app = express();

const rideRequests = [];

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
  }),
);

app.get("/", (req, res) => {
  console.log("GET / route was reached!");
  res.status(200).send("JUST RIDE BACKEND IS WORKING!");
});

const rides = [
  {
    id: 1,
    name: "Raju",
    from: "Narsingi",
    to: "Mehdipatnam",
    fare: 35,
    rating: 4.8,
    vehicle: "Bike",
  },
  {
    id: 2,
    name: "Arjun",
    from: "Narsingi",
    to: "Ibrahim Bagh",
    fare: 30,
    rating: 4.6,
    vehicle: "Scooter",
  },
  {
    id: 3,
    name: "Kiran",
    from: "Narsingi",
    to: "Mehdipatnam",
    fare: 40,
    rating: 4.9,
    vehicle: "Bike",
  },
];

// Return all available rides
app.get("/rides", (req, res) => {
  res.json(rides);
});

// Accept a new ride
app.post("/rides", (req, res) => {
  const { name, from, to, vehicle, fare } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof from !== "string" ||
    typeof to !== "string" ||
    typeof vehicle !== "string" ||
    !name.trim() ||
    !from.trim() ||
    !to.trim() ||
    !["Bike", "Scooter", "Car"].includes(vehicle) ||
    fare === "" ||
    fare === null ||
    fare === undefined ||
    !Number.isFinite(Number(fare)) ||
    Number(fare) <= 0
  ) {
    return res.status(400).json({
      message: "Please provide valid ride details.",
    });
  }

  if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
    return res.status(400).json({
      message: "Starting location and destination must be different.",
    });
  }

  const newRide = {
    id: Date.now(),
    name: name.trim(),
    from: from.trim(),
    to: to.trim(),
    vehicle,
    fare: Number(fare),
  };

  rides.push(newRide);

  res.status(201).json({
    message: "Ride offered successfully!",
    ride: newRide,
  });
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
  const { passengerName, from, to } = req.body ?? {};

  if (
    typeof passengerName !== "string" ||
    typeof from !== "string" ||
    typeof to !== "string" ||
    !passengerName.trim() ||
    !from.trim() ||
    !to.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Passenger name, pickup, and destination are required.",
    });
  }

  if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
    return res.status(400).json({
      success: false,
      message: "Pickup and destination must be different.",
    });
  }

  const newRequest = {
    passengerName: passengerName.trim(),
    from: from.trim(),
    to: to.trim(),
  };

  rideRequests.push(newRequest);

  return res.status(201).json({
    success: true,
    message: "Ride request submitted successfully!",
    request: newRequest,
  });
});

app.get("/ride-requests", (req, res) => {
  res.json(rideRequests);
});

app.get("/ride-requests", (req, res) => {
  res.json(rideRequests);
});

app.listen(3000, () => {
  console.log("JustRide server running on port 3000");
});
