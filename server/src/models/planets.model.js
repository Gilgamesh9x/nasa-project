const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const results = [];
const habitablePlanets = [];

// Don't forget that this block of code is asynchronous and that if the planets.contoller requires the planets variable, well then it's gonna be sent without being complete. So we will solve this problem by adding a promise and waiting for that promise to resolve
// Now we will export this function  and in server.js, we want to wait for this function to complete before listening for and responding to requests.
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) habitablePlanets.push(data); // if isHabitable is true, push the data and the data here is an object ( a csv file line)
      })
      .on("error", (err) => {
        console.log("Error reading the file:", err);
        reject(err);
      })
      .on("end", () => {
        console.log(
          `${habitablePlanets.length} of habitable planets were found!.`
        );
        resolve(); // we call the resolve function when we are done parsing our data and on the server.js, the await finishes when we reach resolve() here or reject
      });
  });
}

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
