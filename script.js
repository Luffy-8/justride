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

console.log(rides);
console.log(rides[0].name);
console.log(rides[1].fare);

const findRideBtn = document.getElementById("findRideBtn");
console.log(findRideBtn);

const rideMessage = document.getElementById("rideMessage");

findRideBtn.addEventListener("click", function () {
  rideForm.style.display = "block";
});

const offerRide = document.getElementById("offerRide");

offerRide.addEventListener("click", function () {
  rideMessage.textContent = "Here I am My braaatheeeerrrr";
});
const rideForm = document.getElementById("rideForm");

const pickupInput = document.getElementById("pickupInput");
const destinationInput = document.getElementById("destinationInput");
const searchRidesBtn = document.getElementById("searchRidesBtn");
const searchResult = document.getElementById("searchResult");

searchRidesBtn.addEventListener("click", function () {
  const pickup = pickupInput.value.trim();
  const destination = destinationInput.value.trim();
  if (pickup === "" || destination === "") {
    searchResult.textContent =
      "Please Enter Pickup address or Destination address";
  } else {
    searchResult.textContent = `Looking for rides from ${pickup} to ${destination}...`;
    ridesContainer.innerHTML = "";

    const matchingRides = rides.filter(function (ride) {
      return (
        ride.from.toLowerCase() === pickup.toLowerCase() &&
        ride.to.toLowerCase() === destination.toLowerCase()
      );
    });

    if (matchingRides.length === 0) {
      searchResult.textContent = "No matching rides found yet. 🛵";
    } else {
      searchResult.textContent = `Found ${matchingRides.length} matching ride(s)!`;
    }

    matchingRides.forEach(function (ride) {
      ridesContainer.innerHTML += `
        <div class="ride-card">
            <h3>${ride.name}</h3>
            <p>${ride.from} → ${ride.to}</p>
            <p>₹${ride.fare} • ⭐ ${ride.rating} • ${ride.vehicle}</p>
        </div>
    `;
    });
  }

  console.log("Pickup:", pickup);
  console.log("Destination:", destination);
});
