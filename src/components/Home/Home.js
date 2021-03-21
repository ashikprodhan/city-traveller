import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import vehicleData from '../../FakeData/fakeData.json'

import Vehicles from '../Vehicles/Vehicles';
import bgPhoto from '../../images/Bg.png'
import './Home.css'

const Home = () => {

   const [vehicle, setVehicle] = useState([]);
   useEffect(()=>{
       setVehicle(vehicleData)
   },[]);
   console.log(vehicle);
    return (
        <Container >
             
           
               <Row>
                   {
                       vehicle.map(transport => <Col>< Vehicles transport={transport} key={transport.id}  ></Vehicles></Col> )
                   }
               </Row>
           
            
        </Container>
    );
};

export default Home;