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

// let's sort the launches and get them ready to be exported
function getAllLunches() {
  return Array.from(launches.values()) // turn the map to an array of objects
    .sort((a, b) => a.flightNumber - b.flightNumber)
    .filter((launch) => launch.upcoming === true && launch.success === true);
}

// Creating new launches based on the user's information
function addNewLaunch(launch) {
  // the lunch here is the data that the user will enter
  latestFlightNumber++;
  /* const upcoming =
    launch.launchDate.getTime() - new Date().getTime() > 0 ? true : false; */
  launches.set(
    latestFlightNumber,
    // This will add the properties we'll add to the properties of the launch object we receive
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["Branded", "Nasa"],
      upcoming: true,
      success: true,
    })
  );
}

// Delete Launches
function abortLaunch(id) {
  const aborted = launches.get(id); // we store the object we'll delete here (but we don't wanna delete it because data is important, so we'll change the property of upcoming to false)
  aborted.upcoming = false; // so here, the value of upcoming will also be edited in the map
  aborted.success = false;
  return aborted; // then we return the deleted object to controller
}

// Get maps whole object:
function getAllLaunchesAbortedorNot() {
  return Array.from(launches.values()).sort(
    (a, b) => a.flightNumber - b.flightNumber
  );
}

module.exports = {
  getAllLunches,
  addNewLaunch,
  abortLaunch,
  getAllLaunchesAbortedorNot,
};
