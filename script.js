let rides = [];
let ridesLoaded = false;

async function loadRides() {
  ridesContainer.textContent = "Loading rides...";
  try {
    const response = await fetch("http://localhost:3000/rides");
    const fetchedRides = await response.json();

    rides = fetchedRides;
    ridesLoaded = true;

    ridesContainer.innerHTML = "";
    rides.forEach((ride) => {
      ridesContainer.innerHTML += createRideCard(ride);
    });
  } catch (error) {
    console.error("Failed to load rides:", error);
    ridesContainer.textContent =
      "Unable to load rides. Please try again later.";
  }
}

const passengerNameInput = document.getElementById("passengerNameInput");
const requestPickupInput = document.getElementById("requestPickupInput");
const requestDestinationInput = document.getElementById(
  "requestDestinationInput",
);
const submitRideRequestBtn = document.getElementById("submitRideRequestBtn");
const requestRideMessage = document.getElementById("requestRideMessage");

const ridesContainer = document.getElementById("ridesContainer");
const showAllRidesBtn = document.getElementById("showAllRidesBtn");

const findRideBtn = document.getElementById("findRideBtn");
const rideForm = document.getElementById("rideForm");
const rideMessage = document.getElementById("rideMessage");
const offerRide = document.getElementById("offerRide");

const pickupInput = document.getElementById("pickupInput");
const destinationInput = document.getElementById("destinationInput");
const searchRidesBtn = document.getElementById("searchRidesBtn");
const searchResult = document.getElementById("searchResult");

findRideBtn.addEventListener("click", function () {
  rideForm.style.display = "block";
});

offerRide.addEventListener("click", function () {
  rideMessage.textContent = "Ride offering will be available soon!";
});

const createRideCard = (ride) => {
  const { name, from, to, fare, rating, vehicle } = ride;

  return `
    <div class="ride-card">
      <h3>${name}</h3>
      <p>${from} → ${to}</p>
      <p>₹${fare} • ⭐ ${rating} • ${vehicle}</p>
    </div>
  `;
};

function searchRides(pickup, destination) {
  return rides.filter(function (ride) {
    if (typeof ride.from === "string" && typeof ride.to === "string") {
      return (
        ride.from.toLowerCase() === pickup.toLowerCase() &&
        ride.to.toLowerCase() === destination.toLowerCase()
      );
    }

    return false;
  });
}

searchRidesBtn.addEventListener("click", function () {
  const pickup = pickupInput.value.trim();
  const destination = destinationInput.value.trim();

  if (!ridesLoaded) {
    searchResult.textContent = "Unable to load rides. Please try again later.";
    return;
  }

  searchResult.textContent = "";

  if (pickup === "" || destination === "") {
    searchResult.textContent = "Please enter pickup and destination.";
    return;
  }
  ridesContainer.innerHTML = "";

  const matchingRides = searchRides(pickup, destination);

  if (matchingRides.length === 0) {
    searchResult.textContent = "No matching rides found yet. 🛵";
    return;
  }

  searchResult.textContent = `Found ${matchingRides.length} matching ride(s)!`;

  matchingRides.forEach(function (ride) {
    ridesContainer.innerHTML += createRideCard(ride);
  });
});

showAllRidesBtn.addEventListener("click", function () {
  pickupInput.value = "";
  destinationInput.value = "";

  ridesContainer.innerHTML = "";

  rides.forEach(function (ride) {
    ridesContainer.innerHTML += createRideCard(ride);
  });

  searchResult.textContent = `Showing all ${rides.length} rides!`;
});

loadRides();

submitRideRequestBtn.addEventListener("click", async () => {
  const passengerName = passengerNameInput.value.trim();
  const from = requestPickupInput.value.trim();
  const to = requestDestinationInput.value.trim();

  // Step 1: Validate the form
  if (!passengerName || !from || !to) {
    requestRideMessage.textContent =
      "Please fill in your name, pickup, and destination.";
    return;
  }

  // Step 2: Send the request to the backend
  try {
    requestRideMessage.textContent = "Submitting your ride request...";
    submitRideRequestBtn.disabled = true;

    const response = await fetch("http://localhost:3000/ride-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passengerName,
        from,
        to,
      }),
    });

    const result = await response.json();

    // Step 3: Handle the backend response
    if (!response.ok) {
      requestRideMessage.textContent =
        result.message || "Unable to submit your ride request.";
      return;
    }

    requestRideMessage.textContent = result.message;
    console.log("Ride request submitted:", result);

    // Step 4: Clear the form after success
    passengerNameInput.value = "";
    requestPickupInput.value = "";
    requestDestinationInput.value = "";
  } catch (error) {
    console.error("Ride request failed:", error);
    requestRideMessage.textContent =
      "Unable to connect to the server. Please try again.";
  } finally {
    submitRideRequestBtn.disabled = false;
  }
});
