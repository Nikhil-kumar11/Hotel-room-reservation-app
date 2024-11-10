const mongoose = require('mongoose');

var mongoURL = "mongodb+srv://ReservationApp:pFO40HkmJ49n3X6k@cluster0.wk0bc.mongodb.net/rooms"

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true}) 
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('connected', function() {
  console.log("Connected to database");
});
module.exports = mongoose;