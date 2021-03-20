import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { createContext, useState } from 'react';
import Map from './components/Map/Map';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <div className="App">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
     <p>name {loggedInUser.name} </p>
     <Router>
       <Header></Header>
       <Switch>
       <Route exact path="/">
            <Home></Home>
          </Route>
       <Route  path="/home">
            <Home></Home>
          </Route>
       <Route path="/login">
            <Login></Login>
          </Route>
       <PrivateRoute path="/destination/:id">
              <Destination></Destination>
          </PrivateRoute>
       

       </Switch>
     </Router>
     </UserContext.Provider>
    </div>
  );
}

export default App;
