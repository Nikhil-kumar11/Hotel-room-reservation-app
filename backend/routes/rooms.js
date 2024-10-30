const express = require("express");
const {
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
  updateRoom,
} = require("../controllers/roomController");

const router = express.Router();

//GET all rooms
router.get("/", getRooms);

//GET a single room
router.get("/:id", getRoom);

//POST a new room
router.post("/", createRoom);

//DELETE a room
router.delete("/:id", deleteRoom);

//UPDATE a room
router.patch("/:id", updateRoom);

module.exports = router;
