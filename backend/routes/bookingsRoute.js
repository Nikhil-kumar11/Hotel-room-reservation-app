const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51QMyElHOTgqZ5CRU3PY5NgefRAIzIwhu6YXWCkpJbpRfRl5u61texhUo5bfNEIVj3v804II03ZWuviOeM5e2k9Q300QlCSUJAz')

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totaldays, totalamount, token } = req.body;

  // console.log(room, userid, fromdate, todate, totaldays, totalamount);


  try {
    
    const customer = await stripe.customers.create({
      email : token.email,
      source : token.id
    })

    const payment = await stripe.charges.create(
      {
          amount : totalamount * 100,
          customer : customer.id,
          currency : 'EUR',
          receipt_email : token.email
      },{
        idempotencyKey : uuidv4()
      }
    )

    if(payment){
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
    
        await roomTemp.save();
    
        console.log(roomTemp);
    
        res.send("Room booked successfully");
      } catch (error) {
        return res.status(400).json({ error });
      }
    }
    res.send('Payment succesful , Your room is booked')

  } catch (error) {
    return res.status(400).json({error});
  }

});

module.exports = router;
