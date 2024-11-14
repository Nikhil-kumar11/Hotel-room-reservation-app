import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
// import "antd/dist/reset.css";
// import moment from "moment";
import axios from "axios";
// import { set } from "mongoose";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function filterByDate(dates, setToDate, setFromDate, duplicateRooms, setRooms) {
  setFromDate(dates[0].format("DD-MM-YYYY"));
  setToDate(dates[1].format("DD-MM-YYYY"));

  let tempRooms = [];
  let availability = false;

  for (const room of duplicateRooms) {
    console.log(room.currentbookings);
    if (room.currentbookings.length > 0) {
      for (const booking of room.currentbookings) {
        if (
          !(
            dates[0].isBefore(booking.toDate) &&
            dates[1].isAfter(booking.fromDate)
          )
        ) {
          availability = true;
        }
      }
    }
    if (availability || room.currentbookings.length === 0) {
      tempRooms.push(room);
    }
    setRooms(tempRooms);
  }
}

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  // const [error, seterror] = useState();

  const { RangePicker } = DatePicker;

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      const { data } = await axios.get("/api/rooms/getallrooms");

      setRooms(data);
      setDuplicateRooms(data);
      setLoading(false);
    }
    fetchRooms();
  }, []);

  return (
    <div className="Container">
      <div className="row mt-4">
        <div className="col-md-3">
          <RangePicker
            format="DD-MM-YYYY"
            onChange={(dates) => {
              filterByDate(
                dates,
                setToDate,
                setFromDate,
                duplicateRooms,
                setRooms
              );
            }}
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : rooms.length > 0 ? (
        rooms.map((room) => {
          return (
            <div className="row justify-content-center mt-5">
              <div className="col-md-9 mt-2">
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            </div>
          );
        })
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Homescreen;
