const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totaldays, totalamount } = req.body;

  // console.log(room, userid, fromdate, todate, totaldays, totalamount);

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionId: "1234",
    });

    const booking = await newBooking.save();

    const roomTemp = await Room.findById({ _id: room._id });

    // console.log(roomTemp);

    console.log();

    roomTemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
    });

    console.log(roomTemp.currentbookings);

    await roomTemp.updateOne({ currentbookings: roomTemp.currentbookings });

    // await roomTemp.save();

    console.log(roomTemp);

    res.send("Room booked successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
