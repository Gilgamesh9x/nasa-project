// Setting up our server using the built in http in node
const http = require("http");
const app = require("./app.js");
////
const { loadPlanetsData } = require("./models/planets.model.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 8000;
// When we run the app, if we have a PORT passed in the environment like an arg, then we use that PORT, else, we just use port 8000
// We pass the Argument for PORT in the package.json at the beginning of "start": "PORT=5000 node src/server.js"
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Now any middleware or any route handlers that we attach to the app object will respond to requests coming in to our server
// So express is really just a fancy listener function for our built in node http server. And the listen function that we get from express "app" is exactly the same as the listen function on our server object. We can use either of them to start our server
// The added benefit of this is that now we can organize our code more by seperating the server functionality that we have here from our express code which we will put in a new file called app.js which will have all our express code
const server = http.createServer(app); // it takes in as an argument a request listener function which responds to all incoming requests to our server
///

async function startServer() {
  await loadPlanetsData(); // so here we will await for the data to complete parsing and then start the server. This will finish when we reach the resolve line on planets.model
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
