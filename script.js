let rides = [];

async function loadRides() {
  ridesContainer.textContent = "Loading rides...";
  try {
    const response = await fetch("http://localhost:3000/rides");
    const fetchedRides = await response.json();

    rides = fetchedRides;

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
    return (
      ride.from.toLowerCase() === pickup.toLowerCase() &&
      ride.to.toLowerCase() === destination.toLowerCase()
    );
  });
}

searchRidesBtn.addEventListener("click", function () {
  const pickup = pickupInput.value.trim();
  const destination = destinationInput.value.trim();

  ridesContainer.innerHTML = "";

  if (pickup === "" || destination === "") {
    searchResult.textContent = "Please enter pickup and destination.";
    return;
  }

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
