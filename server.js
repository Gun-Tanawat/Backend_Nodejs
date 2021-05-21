const express = require("express");
const routes = require("./routes/users"); // import the routes
let bodyParser = require("body-parser");
const app = express();

app.use(express.json());

app.use("/", routes); //to use the routes

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});