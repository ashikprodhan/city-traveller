import React from 'react';

const Map = () => {
    return (
        <div>
            <form action="">
         <label htmlFor="pickTo">Pick to</label>
         
             <input type="text" placeholder="Pick to" id="pick"/> 
             <br/>
              <label htmlFor="pickTo">Pick from</label> <input type="text" placeholder="Pick from" id="pick"/> 
               <br/> <input type="submit" value="search"/>
            </form>
          
        </div>
    );
};

export default Map;