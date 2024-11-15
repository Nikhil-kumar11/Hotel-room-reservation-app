/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

async function bookRoom(room, fromdate, todate, totaldays, totalamount) {
  const bookingDetails = {
    room,
    userid: JSON.parse(localStorage.getItem("currentUser"))._id,
    fromdate,
    todate,
    totaldays,
    totalamount,
  };

  try {
    const result = (await axios.post("/api/bookings/bookroom", bookingDetails))
      .data;
  } catch (error) {
    console.log(error);
  }
}

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState();
  const totalDays =
    moment
      .duration(
        moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"))
      )
      .asDays() + 1;
  //   const [error, seterror] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    async function fetchRoom() {
      setLoading(true);
      const { data } = await axios.post(`/api/rooms/getroombyid`, {
        roomid,
      });
      setRoom(data);
      setTotalAmount(data.rentperday * totalDays);
      setLoading(false);
    }
    fetchRoom();
  }, [roomid, totalDays]);

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls[0]}
                className="bigimg"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h1>Booking details</h1>
                <hr />
                <b>
                  <p>
                    Name: {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From date: {fromdate}</p>
                  <p>To date: {todate}</p>
                  <p>Max count: {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days: {totalDays}</p>
                  <p>Price per day: {room.rentperday}</p>
                  <p>Total price: {room.rentperday * totalDays} </p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    bookRoom(room, fromdate, todate, totalDays, totalAmount);
                  }}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
  // return (
  //     <div>
  //         <h1>Booking screen</h1>
  //         <h1>{match.params.roomid}</h1>
  //     </div>
  // )
}
export default Bookingscreen;
