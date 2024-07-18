const launches = new Map();
let latestFlightNumber = 1;
const launch = {
  flightNumber: 1,
  mission: "Kepler Exporation X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["Branded", "NASA"],
  upcoming: true, // if it's false it means it's historical
  success: true,
};

launches.set(launch.flightNumber, launch);

console.log(launches);
