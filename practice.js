console.log("===== JAVASCRIPT PRACTICE =====");

// 1. Function
function showRideMessage() {
  console.log("Ride Found");
}

showRideMessage();

// 2. Parameters and return
function getRideInfo(name, fare) {
  return name + " - ₹" + fare;
}

console.log(getRideInfo("Nani", 80));

// 3. map()
const rides = [
  { name: "Raju", fare: 35 },
  { name: "Arjun", fare: 30 },
  { name: "Kiran", fare: 40 },
];

const rideNames = rides.map(function (ride) {
  return ride.name;
});

console.log("Ride names:", rideNames);

// 4. Spread operator
const newRide = {
  name: "Sai",
  from: "Narsingi",
  to: "Mehdipatnam",
  fare: 30,
  rating: 4.7,
  vehicle: "Bike",
};

const updatedRides = [...rides, newRide];

console.log("Updated rides:", updatedRides);
console.log("Total rides:", updatedRides.length);

// 5. reduce()
const totalFare = rides.reduce(function (total, ride) {
  return total + ride.fare;
}, 0);

console.log("Total fare:", totalFare);

// 6. Optional chaining
const testRide = {
  name: "Raju",
};

console.log(testRide.vehicle?.type);

// 7. Promise
const getRides = new Promise(function (resolve) {
  setTimeout(function () {
    resolve("Rides received!");
  }, 2000);
});

// 8. async/await + try/catch
async function loadRides() {
  try {
    const result = await getRides;
    console.log(result);
  } catch (error) {
    console.log("Failed to load rides.");
  }
}

loadRides();

// 9. GET request
async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    console.log("Status:", response.status);
    console.log("Success:", response.ok);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("Users:", data);
  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
}

getData();

// 10. POST request
async function createRide() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Raju",
        from: "Narsingi",
        to: "Mehdipatnam",
        fare: 35,
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("Created ride:", data);
  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
}

createRide();

// 11. JustRide-style ride request
async function sendRideRequest() {
  const rideRequest = {
    passenger: "Revanth",
    from: "Narsingi",
    to: "Mehdipatnam",
    offer: 35,
  };

  try {
    console.log("Sending ride request...");

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rideRequest),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    console.log("Ride request successful!");
    console.log("Ride request sent:", data);
  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
}

sendRideRequest();
