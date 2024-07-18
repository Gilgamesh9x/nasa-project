const {
  getAllLunches,
  addNewLaunch,
  abortLaunch,
  getAllLaunchesAbortedorNot,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLunches()); // We can't pass a map so we will get => [{data}]
}

// Add new lunches
function httpAddNewLaunch(req, res) {
  const launch = req.body;
  // if one of the properties isn't sent my the user
  if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate)
    return res.status(400).json({
      error: "Sorry, some properties are missing",
    });
  // if the user doesn't enter a valid date
  if (isNaN(new Date(launch.launchDate).getTime()))
    return res.status(400).json({
      error: "Sorry, invalid date",
    });
  // create a new date object and add the new launch to our map and send that map as a response
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

// Abort launches

function httpAbortLaunch(req, res) {
  /* const id = +req.url.slice(1); */ // we remove the / in the url and turn it into a num so it'll be the id
  const id = +req.params.id;
  const abortedLunch = abortLaunch(id); // the function will run and store the deleted item
  return res.status(200).json({
    message: "Launch Deleted",
    abortedLunch,
  });
}

//

function httpGetAllLaunchesAbortedorNot(req, res) {
  return res.status(200).json(getAllLaunchesAbortedorNot());
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
  httpGetAllLaunchesAbortedorNot,
};
