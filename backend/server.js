require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const roomRoutes = require("./routes/rooms");

// Express App
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// App routes
app.use("/rooms", roomRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Server connected to db and listening on port",
        process.env.PORT
      );
    });
  })
  .then((err) => {
    console.log(err);
  });
