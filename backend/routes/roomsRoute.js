const express = require('express');
const router = express.Router();

const Room = require('../models/room');
router.get('/getallrooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms)
    } catch (err) {
        return res.json({ message: err });
    }
}) 
router.post('/getroombyid', async (req, res) => {
    const roomid =  await req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid });
        res.send(room)
    } catch (err) {
        return res.json({ message: err });
    }
}) 

router.post('/addroom', async (req, res) => {
    const roomid =  await req.body.roomid;
    try {
        const newroom = new Room(req.body)
        await newroom.save()

        res.send('New Room Added Succesfully')
        
    } catch (err) {
        return res.json({ message: err });
    }
}) 



module.exports = router;