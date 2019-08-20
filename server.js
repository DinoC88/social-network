const express = require("express");
const passport = require("passport");
const path = require("path");
const mysql = require("mysql");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");
const app = express();
const dbInfo = require("./db/database").mysqlInfo;

//create connection
const DB = mysql.createConnection(dbInfo)

//connect 
DB.connect((err) => {
  if(err) {
    console.log(err);
  }
  console.log("MySQL connected");
})


//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Server static assets if in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on: " + port));
