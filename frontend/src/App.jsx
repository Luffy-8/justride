import { useEffect, useState } from "react";
import "./App.css";
import RideCard from "./RideCard.jsx";

function App() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Offer a Ride form state
  const [driverName, setDriverName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [fare, setFare] = useState("");
  const [formMessage, setFormMessage] = useState("");

  // Handle form submission

  async function handleSubmit(event) {
    event.preventDefault();
    setFormMessage("");

    if (
      !driverName.trim() ||
      !startLocation.trim() ||
      !destination.trim() ||
      !vehicle ||
      !fare.trim()
    ) {
      setFormMessage("Please fill in every field.");
      return;
    }

    const numericFare = Number(fare);

    if (!Number.isFinite(numericFare) || numericFare <= 0) {
      setFormMessage("Please enter a valid fare greater than ₹0.");
      return;
    }

    const newRide = {
      name: driverName.trim(),
      from: startLocation.trim(),
      to: destination.trim(),
      vehicle,
      fare: numericFare,
    };

    try {
      const response = await fetch("http://localhost:3000/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRide),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to offer ride.");
      }

      setRides((currentRides) => [...currentRides, data.ride]);

      setFormMessage("Ride offered successfully!");

      setDriverName("");
      setStartLocation("");
      setDestination("");
      setVehicle("");
      setFare("");
    } catch (err) {
      console.error("Error offering ride:", err);
      setFormMessage(err.message || "Unable to offer ride. Please try again.");
    }
  }

  // Load available rides from the backend
  useEffect(() => {
    async function loadRides() {
      try {
        const response = await fetch("http://localhost:3000/rides");

        if (!response.ok) {
          throw new Error("Failed to fetch rides");
        }

        const data = await response.json();
        setRides(data);
      } catch (err) {
        console.error("Error loading rides:", err);
        setError("Unable to load rides. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadRides();
  }, []);

  return (
    <>
      <header>
        <h1>JustRide 🏎️</h1>
        <p>Your commute, connected.</p>

        <nav>
          <a href="/">Home</a>
          <a href="#available-rides">Find Rides</a>
          <a href="#offer-ride">Offer a Ride</a>
        </nav>
      </header>

      <section id="available-rides" className="rides-section">
        <h2>Available Rides</h2>
        <p>Find a ride that matches your route.</p>

        {loading ? (
          <p>Finding available rides...</p>
        ) : error ? (
          <p>{error}</p>
        ) : rides.length === 0 ? (
          <p>No rides available right now. Check back soon!</p>
        ) : (
          <div className="rides-grid">
            {rides.map((ride) => (
              <RideCard
                key={ride.id}
                name={ride.name}
                from={ride.from}
                to={ride.to}
                fare={ride.fare}
                rating={ride.rating}
                vehicle={ride.vehicle}
              />
            ))}
          </div>
        )}
      </section>

      <section id="offer-ride" className="offer-section">
        <h2>Have a ride to offer?</h2>
        <p>Share your route and connect with people travelling your way.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={driverName}
            onChange={(event) => setDriverName(event.target.value)}
          />

          <input
            type="text"
            placeholder="Starting location"
            value={startLocation}
            onChange={(event) => setStartLocation(event.target.value)}
          />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />

          <select
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value)}
          >
            <option value="">Select your vehicle</option>
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
            <option value="Car">Car</option>
          </select>

          <input
            type="number"
            placeholder="Fare in ₹"
            min="1"
            step="any"
            value={fare}
            onChange={(event) => setFare(event.target.value)}
          />

          <button type="submit">Offer a Ride</button>

          {formMessage && <p role="status">{formMessage}</p>}
        </form>
      </section>
    </>
  );
}

export default App;
