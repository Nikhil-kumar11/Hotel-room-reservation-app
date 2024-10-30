const Room = require("../models/roomModel");
const mongoose = require("mongoose");

//Get all rooms
const getRooms = async (req, res) => {
  const rooms = await Room.find({}).sort({ createdAt: -1 });

  res.status(200).json(rooms);
};

//Get a signle room
const getRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No room with such id` });
  }

  const room = await Room.findById(id);

  if (!room) {
    return res.status(404).json({ error: `No room with such id` });
  }

  res.status(200).json(room);
};

//Create new room
const createRoom = async (req, res) => {
  const { number, type, isAvailable, price, photoUri, name } = req.body;

  //Add room to db
  try {
    const room = await Room.create({
      number,
      type,
      isAvailable,
      price,
      photoUri,
      name,
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete a room
const deleteRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No room with such id` });
  }

  const room = await Room.findOneAndDelete({ _id: id });

  if (!room) {
    return res.status(404).json({ error: `No room with such id` });
  }

  res.status(200).json({ message: "Room deleted successfully!" });
};

//Update a room
const updateRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No room with such id` });
  }

  const room = await Room.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!room) {
    return res.status(404).json({ error: `No room with such id` });
  }

  res.status(200).json({ message: "Room updated successfully!" });
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};
