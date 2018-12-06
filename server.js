const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport")

const users = require("./routes/api/users");

const app = express();

//body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json())

//connect to MongoDB
const db = require("./config/keys").mongoURI;

mongoose
.connect(
  db,
  { useNewUrlParser: true }
)
.then(() => console.log("Connection to MongoDB successful"))
.catch(err => console.log(err))

//connect to passport middleware
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users)

const port = process.env.port || 5050;

app.listen(port, () => console.log("Server up and running on port", `${port}`))