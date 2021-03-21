import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import detail from '../../FakeData/fakeData.json';
import Map from '../Map/Map';
import './Destination.css'

const Destination = () => {
  let { id } = useParams();
  const [location, setLocation] = useState({
    pickTo: '',
    pickFrom: ''
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [press, setPress] = useState(false)
  const [details, setDetails] = useState(detail)
  // console.log(details);
  const vehicle = details.find(vcle => vcle.id == parseInt(id));
  const { image, price } = vehicle;
  // console.log('vecle', image);
  const handlePress = () => {
    setPress(!press);
  }

  const handleBlur = (e) => {
    // debugger;
    // console.log(e.target.name,e.target.value);
    let isLocationValid = true;
    if (e.target.name === 'pickTo') {

      isLocationValid = /^[a-zA-Z ]+$/.test(e.target.value);
      console.log(isLocationValid);
      //  console.log(e.target.name,isEmailValid);
    }

    if (e.target.name === 'pickFrom') {


      //smart validation  /^([a-z0-9]{8,})$/
      //  const isPasswordValid =/^([a-z0-9]{8,})$/.test(e.target.value)
      const isPickFromValid = /^[a-zA-Z ]+$/.test(e.target.value);
      isLocationValid = isPickFromValid;
      //    console.log(e.target.name,isPickFromValid);
      console.log(isLocationValid);
    }
    if (isLocationValid) {
      const newLocationInfo = { ...location };
      newLocationInfo[e.target.name] = e.target.value;
      setLocation(newLocationInfo);



    }
    // console.log('last one', isEmailValid);
  }

  return (
    <Container>
      <Row  >
        <Col >{!press &&
          <form onSubmit={handlePress} >

            <label htmlFor="pickTo">Pick to</label>
            <input type="text" name="pickTo" onBlur={handleBlur} placeholder="Pick to" id="pick" required />
            <br />
            <label htmlFor="pickFrom">Pick from</label>
            <input type="text" name="pickFrom" onBlur={handleBlur} placeholder="Pick from" id="pick" required />

            <br /> <input type="submit" value="search" />
          </form>}
          
          {press && <div >
            <h4> to {location.pickTo} from {location.pickFrom} </h4>
            <div className="d-flex" ><img src={image} height="50px" width="50px" className="img-fluid" alt="" />
              <p>Travel fare :${price}</p></div>
            <div className="d-flex" ><img src={image} height="50px" width="50px" className="img-fluid" alt="" />
              <p>Travel fare :${price}</p></div>
            <div className="d-flex" ><img src={image} height="50px" width="50px" className="img-fluid" alt="" />
              <p>Travel fare :${price}</p></div>


          </div>

          }
        </Col>
        <Col><Map></Map></Col>
      </Row>

    </Container>
  );
};

export default Destination;