const express = require("express");
const path = require("path");
const cors = require("cors"); // we installed it to allow us to send requests to the different ports (the client and the server)
const planetsRouter = require("./routers/planets/planets.router");
const launchesRouter = require("./routers/launches/launches.router");
const morgan = require("morgan");
////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
// We'll start to build a chain of middleware that handles requests coming to our application
// The request comes in to express() "app", gets checked for the json() content type if we're passing some data, and then goes through our express router which handles the planets routes
app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // middleware to allow all requests form all websites. But we only want our localhost at port 3000 to send us requests

app.use(morgan("combined")); // another middleware for logs
app.use(express.json()); // this middleware is for parsing incoming request bodies in JSON format. When a client sends a POST, PUT, or PATCH request with JSON data in the body, this middleware parses the JSON data and makes it available in the req.body property of the request object, allowing you to access the data in your route handlers
app.use(express.static(path.join(__dirname, "..", "", "public"))); // here we'll serve the public folder which is the website, basically.

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.use("/*", (req, res) => {
  // the "*" matches anything that follows the "/"" to match any endpoint that isn't served here and instead the react app will handle it
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
