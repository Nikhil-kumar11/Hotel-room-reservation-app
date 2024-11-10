import React, { useState, useEffect } from "react";
import axios from "axios";
import { set } from "mongoose";
import Room from "../components/Room";
function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, seterror] = useState();
  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      const { data } = await axios.get("/api/rooms/getallrooms");
      setRooms(data);
      setLoading(false);
    }
    fetchRooms();
  }, []);

  return (
    <div className="Container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => {
          return <div className="col-md-9 mt-2">
                <Room room={room} />
            </div>;
        })
        )}
        </div>
    </div>
  );
}

export default Homescreen;
