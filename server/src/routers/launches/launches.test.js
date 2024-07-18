const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/) // this meants we're expcting json
      .expect(200); // this will make a request against our API and say if it's working or not
    /* expect(response.statusCode).toBe(200); */ // instead of writing it like this, we can use chaining
  });
});

describe("Test POST /launch", () => {
  // the launch data that we will be sending
  const completeLunchData = {
    mission: "a",
    rocket: "b",
    target: "c",
    launchDate: "January 4, 2008",
  };
  // the launch data so we can add the launchDate in date format later
  const launchDataWithoutDate = {
    mission: "a",
    rocket: "b",
    target: "c",
  };
  // missing property data
  const launchWithMisttingData = {
    mission: "a",
    target: "c",
    launchDate: "January 4, 2008",
  };
  // date not correct
  const launchWithIncorrectDate = {
    mission: "a",
    rocket: "b",
    target: "c",
    launchDate: "fdsf 4, 2008",
  };
  test("It should respond with 201 created", async () => {
    // here we check the response
    const response = await request(app)
      .post("/launches")
      .send(completeLunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    // adding date format because we're expecting a date format as a response and not a string
    const responseDate = response.body.launchDate;
    launchDataWithoutDate.launchDate = responseDate;
    // here we check what was sent in the response
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
  // in this next case, we want to test if the error case is working or not. So basically, we want this to return error 400 to make sure it's working
  test("It should catch missing required properties", async () => {
    // we test the response (400)
    const response = await request(app)
      .post("/launches")
      .send(launchWithMisttingData) // this has a missing property
      .expect("Content-Type", /json/)
      .expect(400);

    // we test what we got back
    // we're gonna see if 2 objects are the same
    expect(response.body).toStrictEqual({
      error: "Sorry, some properties are missing",
    });
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchWithIncorrectDate) // Incorrect date
      .expect("Content-Type", /json/)
      .expect(400);
    // we're gonna see if 2 objects are the same
    expect(response.body).toStrictEqual({
      error: "Sorry, invalid date",
    });
  });
});
