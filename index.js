require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const { MONGO_URI, cookieKey } = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true }
);
const app = express();

// Express middleware
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
//--

// Routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
//--

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like our main.js and main.css file
  // THIS LINE HAS TO COME FIRST!!! We do not want that our express server return index.html even if they ask for the main.js for instance
  app.use(express.static("client/build"));

  // Express will redirect all the unknown routes to serve index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
