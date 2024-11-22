import React from "react";
import {Link} from 'react-router-dom';

function Landingscreen(){
    return(
        <div className='row Landing justify-content-center'>

            <div className="col-md-9 my-auto text-center">

                <h1 style={{color:'white' , fontSize:'130px'}}>???????</h1>
                <h2 style={{color:'white'}}>There is only one boss. Our Guest.</h2>

                <Link to='/home'>
                    <button className='btn landingbtn' style={{color: 'black'}}>Get Started</button>
                </Link>
                
            </div>

        </div>
    )
}

export default Landingscreen