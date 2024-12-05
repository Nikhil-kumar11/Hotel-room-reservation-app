import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import {Tag, Divider} from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [loading, setLoading] = useState(false); // Define the loading state

    useEffect(() => {

        if (!user) {
            window.location.href = '/login'
        }

    }, []);

    async function cancelBooking(bookingid, roomid) {
        try {
            setLoading(true);
            const result = await axios.post("/api/bookings/cancelbooking", { bookingid, roomid }).data;
            console.log(result);
            setLoading(false);
            Swal.fire('Congratulations', 'Your booking has been cancelled', 'success').then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire('Oops', 'Something went wrong', 'error');
        }
    }

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key="1">
                    <h1>
                        My Profile
                    </h1>

                    <br />

                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? 'YES' : 'NO'}

                    </h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings/>
                </TabPane>
            </Tabs>
        </div>
    )

}


export function MyBookings(cancelBooking) {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false);
    const [seterror] = useState();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                console.log("Fetching bookings for user ID:", user._id); // Log user ID
                const data = await axios.post("/api/bookings/getbookingsbyuserid", { userid: user._id });
                console.log("Bookings fetched from backend:", data.data); // Log the response
                setBookings(data.data);
                console.log("Bookings state after fetch:", bookings);
            } catch (error) {
                console.log("Error fetching bookings:", error); // Log any errors
                seterror("Failed to load bookings.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchBookings();
    }, [user._id]);

    return (
        <div className='row'>
            <div className='col-md-6'>

                {loading && (<Loader />)}
                {bookings && (bookings.map(booking => {

                    return <div className='bs'>
                        <h1>
                            {booking.room}
                        </h1>
                        <p>
                            BookingId : {booking._id}
                        </p>
                        <p>
                            CheckIn : {booking.fromdate}
                        </p>
                        <p>
                            Check Out : {booking.todate}
                        </p>
                        <p>
                            Amount : {booking.totalamount}
                        </p>
                        <p>
                            Status : {booking.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                        </p>

                        {booking.status !==+ 'cancelled' && (
                            <div className='text-right'>
                                <button className='btn btn-primary' onClick={() => cancelBooking(booking._id, booking.roomid)}>CANCEL BOOKING</button>
                            </div>
                        )}
                    </div>
                }))}

            </div>
        </div>
    )
}

export default Profilescreen;