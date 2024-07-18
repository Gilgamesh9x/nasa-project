const { getAllPlanets } = require("../../models/planets.model");
function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets()); // the return there is optional, it just says that when we send a response, we automatically exit the function because we don't wanna send more than 1 response
}

module.exports = {
  httpGetAllPlanets,
};
