const ridesContainer = document.getElementById("ridesContainer");

const rides = [
  {
    name: "Raju",
    from: "Narsingi",
    to: "Mehdipatnam",
    fare: 35,
    rating: 4.8,
    vehicle: "Bike",
  },
  {
    name: "Arjun",
    from: "Narsingi",
    to: "Ibrahim Bagh",
    fare: 30,
    rating: 4.6,
    vehicle: "Bike",
  },
  {
    name: "Kiran",
    from: "Narsingi",
    to: "Mehdipatnam",
    fare: 40,
    rating: 4.9,
    vehicle: "Car",
  },
];

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
