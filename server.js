const express = require('express');
const app = express();
app.use(express.json());
const dbConfig = require('./db.js');
const roomRoute = require('./routes/roomsRoute');

app.use('/api/rooms', roomRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});