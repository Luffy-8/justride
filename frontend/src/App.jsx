import { useEffect, useState } from "react";
import "./App.css";
import RideCard from "./RideCard.jsx";

function App() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const filteredRides = rides.filter((ride) => {
    const matchesFrom = ride.from
      .toLowerCase()
      .includes(searchFrom.trim().toLowerCase());

    const matchesTo = ride.to
      .toLowerCase()
      .includes(searchTo.trim().toLowerCase());

    return matchesFrom && matchesTo;
  });

  // Passenger request form state
  const [passengerName, setPassengerName] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requesting, setRequesting] = useState(false);

  // Driver offer form state
  const [driverName, setDriverName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [fare, setFare] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [offering, setOffering] = useState(false);

  // Submit a passenger ride request
  async function handleRequestSubmit(event) {
    event.preventDefault();
    setRequestMessage("");

    if (!passengerName.trim() || !pickup.trim() || !drop.trim()) {
      setRequestMessage("Please fill in every field.");
      return;
    }

    if (pickup.trim().toLowerCase() === drop.trim().toLowerCase()) {
      setRequestMessage("Pickup and destination must be different.");
      return;
    }

    setRequesting(true);

    const newRequest = {
      passengerName: passengerName.trim(),
      from: pickup.trim(),
      to: drop.trim(),
    };

    try {
      const response = await fetch("http://localhost:3000/ride-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit ride request.");
      }

      setRequestMessage(data.message || "Ride request submitted successfully!");

      setPassengerName("");
      setPickup("");
      setDrop("");
    } catch (err) {
      console.error("Error submitting ride request:", err);
      setRequestMessage(
        err.message || "Unable to submit request. Please try again.",
      );
    } finally {
      setRequesting(false);
    }
  }

  // Submit a driver ride offer
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

    if (
      startLocation.trim().toLowerCase() === destination.trim().toLowerCase()
    ) {
      setFormMessage("Starting location and destination must differ.");
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

    setOffering(true);

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
    } finally {
      setOffering(false);
    }
  }

  // Load available rides
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
          <a href="#request-ride">Request a Ride</a>
          <a href="#offer-ride">Offer a Ride</a>
        </nav>
      </header>

      <section id="available-rides" className="rides-section">
        <h2>Available Rides</h2>
        <p>Find a ride that matches your route.</p>

        <input
          type="text"
          placeholder="Pickup location"
          value={searchFrom}
          onChange={(event) => setSearchFrom(event.target.value)}
        />

        <input
          type="text"
          placeholder="Destination"
          value={searchTo}
          onChange={(event) => setSearchTo(event.target.value)}
        />

        <button
          type="button"
          onClick={() => {
            setSearchFrom("");
            setSearchTo("");
          }}
        >
          Clear Search
        </button>

        {loading ? (
          <p>Finding available rides...</p>
        ) : error ? (
          <p>{error}</p>
        ) : rides.length === 0 ? (
          <p>No rides available right now. Check back soon!</p>
        ) : filteredRides.length === 0 ? (
          <p>No matching rides found. Try another route.</p>
        ) : (
          <div className="rides-grid">
            {filteredRides.map((ride) => (
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

      <section id="request-ride" className="offer-section">
        <h2>Need a Ride?</h2>
        <p>Tell us where you're going, and request a ride.</p>

        <form onSubmit={handleRequestSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={passengerName}
            onChange={(event) => setPassengerName(event.target.value)}
            disabled={requesting}
          />

          <input
            type="text"
            placeholder="Pickup location"
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
            disabled={requesting}
          />

          <input
            type="text"
            placeholder="Destination"
            value={drop}
            onChange={(event) => setDrop(event.target.value)}
            disabled={requesting}
          />

          <button type="submit" disabled={requesting}>
            {requesting ? "Submitting..." : "Request a Ride"}
          </button>

          {requestMessage && <p role="status">{requestMessage}</p>}
        </form>
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
            disabled={offering}
          />

          <input
            type="text"
            placeholder="Starting location"
            value={startLocation}
            onChange={(event) => setStartLocation(event.target.value)}
            disabled={offering}
          />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            disabled={offering}
          />

          <select
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value)}
            disabled={offering}
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
            disabled={offering}
          />

          <button type="submit" disabled={offering}>
            {offering ? "Submitting..." : "Offer a Ride"}
          </button>

          {formMessage && <p role="status">{formMessage}</p>}
        </form>
      </section>
    </>
  );
}

export default App;
