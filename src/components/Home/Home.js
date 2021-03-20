import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import vehicleData from '../../FakeData/fakeData.json'

import Vehicles from '../Vehicles/Vehicles';
import bgPhoto from '../../images/Bg.png'

const Home = () => {

   const [vehicle, setVehicle] = useState([]);
   useEffect(()=>{
       setVehicle(vehicleData)
   },[]);
   console.log(vehicle);
    return (
        <div className="bgImage" >
             
           
               <Row>
                   {
                       vehicle.map(transport => < Vehicles transport={transport} key={transport.id}  ></Vehicles> )
                   }
               </Row>
           
            
        </div>
    );
};

export default Home;