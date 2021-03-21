import React from 'react';


// or less ideally
import { Button ,Card} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const Vehicles = (props) => {
    const { vehicleType, image ,id} = props.transport;
    console.log(id);
    let history =  useHistory();
    const handleClick = () =>{
        const url =`/destination/${id}`;
        history.push(url);
    }


    return (
        <>
            
            <Card onClick={handleClick} style={{ width: '150px',margin:'10px 10px' }}>
            {/* <Link to={`/destination/${id}`}> */}
            
                <Card.Img variant="top" src={image} />
                <Card.Body>
                <Card.Title>{vehicleType}</Card.Title>
                   
                </Card.Body>
                {/* </Link> */}
            </Card>
            
        </>
    );
};

export default Vehicles;