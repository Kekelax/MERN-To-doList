const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

//Import custom modules
const connectDB = require("./config/db");

// Load config from environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDB();

//Initialise app
const app = express();

// Body parser - middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api/items", require("./routes/items"));
app.use("/api/auth", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server - listen to port 3001 or a port specified in process.env
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
