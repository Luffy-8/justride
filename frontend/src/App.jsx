import { useEffect, useState } from "react";
import "./App.css";
import RideCard from "./RideCard.jsx";

function App() {
  const [rides, setRides] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

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
        <button type="button">Offer a Ride</button>
      </section>
    </>
  );
}

export default App;
