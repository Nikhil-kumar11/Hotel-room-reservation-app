import { Divider } from "antd";
import React, {useState,useEffect} from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {
    return (
        <div className ='mt-3 ml-3 mr-3 bs'>
            <h1>Admin Panel</h1>
            <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings" key="1">
                    <Bookings/>
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <h1>Rooms</h1>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <h1>Add Room</h1>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <h1>Users</h1>
                </TabPane>
            </Tabs>
            </div>
        </div>
    );
}

export default Adminscreen;

export function Bookings(){

const [bookings , setbookings] = useState([])
const [loading , setloading] = useState(true)
const [error, seterror] = useState()
    useEffect(async() => {
        try {
            const data = (await axios.get("/api/bookings/getallbookings")).data
            setbookings(data)
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(error)
        }

    })
    return (
        <div className="row">
            <div className="col-md-10">
                
                <h1>Bookings</h1>
                {loading && (<Loader/>)}
                {bookings.length &&(<h1>There are total {bookings.length} bookings</h1>)}
            </div>
        </div>
    )
}