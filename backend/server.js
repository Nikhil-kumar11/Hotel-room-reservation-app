require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConfig = require("./db.js");
const roomRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());

app.use(cors());

app.use("/api/rooms", roomRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
