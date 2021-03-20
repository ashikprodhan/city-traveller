import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import detail from '../../FakeData/fakeData.json';

const Destination = () => {
    let { id} = useParams();

    const [loggedInUser, setLoggedInUser] =useContext(UserContext)
    const [press, setPress] = useState(false)
    const [details, setDetails] = useState(detail)
    console.log(details);
    const vehicle = details.find(vcle => vcle.id == parseInt(id));
    const {image ,price}= vehicle;
    console.log('vecle', image);
    const handlePress=()=>{
        setPress(!press);
    }
    // useEffect(()=>{
    //     setDetails(detail)
    // },[]);
    return (
        <div>
             {!press && <form action="">
                 <p>id : {id} </p>
         <label htmlFor="pickTo">Pick to</label>
         
             <input type="text" placeholder="Pick to" id="pick"/> 
             <br/>
              <label htmlFor="pickTo">Pick from</label> <input type="text" placeholder="Pick from" id="pick"/> 

               <br/> <input onClick={handlePress} type="submit" value="search"/>
            </form>}
            {press && <div>
                <h4> Gulshan to Mirpur </h4>
                <img src={image} alt=""/>
                <p>Price :${price}</p>
            </div>

            }
            <h1>this is destination </h1>
        </div>
    );
};

export default Destination;