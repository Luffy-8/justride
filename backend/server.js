import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  }),
);

app.get("/", (req, res) => {
  console.log("GET / route was reached!");
  res.status(200).send("JUST RIDE BACKEND IS WORKING!");
});

app.listen(3000, () => {
  console.log("JustRide server running on port 3000");
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
