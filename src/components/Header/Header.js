import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] =useContext(UserContext)
    return (
        <div  >

<nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                <div className="container-fluid">
                    <Link to="/home"className="navbar-brand">City travellers</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            <Link to="/destination" className="nav-link active">Destination</Link>
                            <Link to="/contact" className="nav-link active">Contact</Link>
                        {loggedInUser.email ? <p>{loggedInUser.name}</p> : <Link to="/login" className="nav-link active">Login</Link>}
                            
                        </div>
                    </div>
                </div>
            </nav>

            {/* <ul class="nav justify-content-center">
  <li class="nav-item">
  <Link to="/home">Home</Link>
   </li>
  
  <li class="nav-item">
  <Link to="/destination">Destination</Link>
  </li>
  <li class="nav-item">
  <Link to="/contact">Contact</Link>
  </li>
  <li class="nav-item">
  <Link to="/blog">Blog </Link>
  </li>
  <li class="nav-item">
  <Link to="/login"><button >Login</button> </Link>
  </li>
</ul> */}
           {/* <nav  >
            
           
            
            
          
            
            </nav> */}
        </div>
    );
};

export default Header;