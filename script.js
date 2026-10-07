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

  if (pickup === "" || destination === "") {
    searchResult.textContent =
      "Please Enter Pickup address or Destination address";
  } else {
    const matchingRides = searchRides(pickup, destination);

    searchResult.textContent = `Looking for rides from ${pickup} to ${destination}...`;

    ridesContainer.innerHTML = "";

    if (matchingRides.length === 0) {
      searchResult.textContent = "No matching rides found yet. 🛵";
    } else {
      searchResult.textContent = `Found ${matchingRides.length} matching ride(s)!`;
    }

    matchingRides.forEach(function (ride) {
      ridesContainer.innerHTML += createRideCard(ride);
    });
  }

  console.log("Pickup:", pickup);
  console.log("Destination:", destination);
});

//PRACTICE
function showRideMessage() {
  console.log("Ride Found");
}

showRideMessage();

function getRideInfo(name, fare) {
  return name + "- $/-" + fare;
}
console.log(getRideInfo("Nani", 80));

const rideNames = rides.map(function (ride) {
  return ride.name;
});

console.log(rideNames);

const newRide = {
  name: "sai",
  from: "Narsingi",
  to: "Mehdipatnam",
  fare: 30,
  rating: 4.7,
  vahicle: "Bike",
};

const updatedRides = [...rides, newRide];
console.log(updatedRides);
console.log(updatedRides.length);

const totalFare = rides.reduce(function (total, ride) {
  return total + ride.fare;
}, 0);

console.log(totalFare);

const testRide = {
  name: "Raju",
};

console.log(testRide.vehicle?.type);

const getRides = new Promise(function (resolve) {
  setTimeout(function () {
    resolve("Rides received!");
  }, 2000);
});

async function loadRides() {
  try {
    const result = await getRides;
    console.log(result);
  } catch (error) {
    console.log("Failed to load rides.");
  }
}

loadRides();
