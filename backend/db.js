require("dotenv").config();

const mongoose = require("mongoose");

var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
var connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.on("connected", function () {
  console.log("Connected to database");
});
module.exports = mongoose;
