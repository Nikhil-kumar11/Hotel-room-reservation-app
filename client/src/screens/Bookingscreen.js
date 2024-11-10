import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function Bookingscreen() {  
    const { roomid } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState();
    const [room, setRoom] = useState();
    useEffect(() => {
        async function fetchRoom() {
            setLoading(true);
            const { data } = await axios.post(`/api/rooms/getroombyid`, { roomid });
            setRoom(data);
            setLoading(false);
        }
        fetchRoom();
    }, [roomid]);
    return(
        <div className="m-5">
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h1>Error</h1>
            ) : (
                <div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-5">
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} className="bigimg" style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>  
                        <div className="col-md-5">
                            <div style={{textAlign:"right"}}>
                            <h1>Booking details</h1>
                            <hr />
                            <b>
                            <p>Name: </p>
                            <p>From date:</p>
                            <p>To date:</p>
                            <p>Max count: {room.maxcount}</p>
                            </b>
                            </div>
                            <div style={{textAlign:"right"}}>
                                <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days: </p>
                                <p>Price per day: {room.rentperday}</p>
                                <p>Total price: </p>
                                </b>
                            </div>
                            <div style={{float:"right"}}>
                                <button className="btn btn-primary">Book now</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
    // return (
    //     <div>
    //         <h1>Booking screen</h1>
    //         <h1>{match.params.roomid}</h1>
    //     </div>
    // )

}
export default Bookingscreen;