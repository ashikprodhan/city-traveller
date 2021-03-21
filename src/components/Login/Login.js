


// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";

import firebaseConfig from "./firebase.config";



function Login() {
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
    }
  const history = useHistory();
  const location = useLocation();
  

  const { from } = location.state || { from: { pathname: "/" } };
  
  const [loggedInUser, setLoggedInUser] =useContext(UserContext)
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  
 
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        // console.log(res.user);
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isLoggedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
        
        //  console.log(displayName,email,photoURL);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err);
      })
    //  console.log(user);
  }
  const handleSignOut = () => {
    firebase.auth().signOut().then(res => {
      const signedOutUser = {
        isLoggedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser)
      setLoggedInUser(signedOutUser)
      console.log('response', res);
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  }
  const handleBlur = (e) => {
    // debugger;
    // console.log(e.target.name,e.target.value);
    let isEmailValid = true;
    if (e.target.name === 'email') {
      isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      //  console.log(e.target.name,isEmailValid);
    }

    if (e.target.name === 'password') {

      const isPasswordValid = e.target.value.length > 6;
      //smart validation  /^([a-z0-9]{8,})$/
      //  const isPasswordValid =/^([a-z0-9]{8,})$/.test(e.target.value)
      const passwordHasNumber = /\d/.test(e.target.value);
      isEmailValid = isPasswordValid && passwordHasNumber;
      //  console.log(e.target.name,isEmailValid);
    }
    if (isEmailValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo)


    }
    // console.log('last one', isEmailValid);
  }
  const handleSubmit = (e) => {
    console.log(user.password, user.email);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // Signed in 
          // var user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          updateUserName(user.name)
          history.replace(from);
          // ...
        })
        .catch((error) => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
          
          // console.log(errorCode);
          // console.log('Used email', errorCode,errorMessage);
          // ..
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);

          console.log('sign in user info',res.user.displayName);

          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
        });
    }
    e.preventDefault();
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      console.log('User name updated successfully');
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }
 

  return (
    <div className="App">
      {
        user.isLoggedIn ? <button onClick={handleSignOut}>sign out</button> : <button onClick={handleSignIn} >log in </button>
      }
      {/* <br/>
      <button onClick={handlefbSingIn} >Log in using facebook</button> */}
      {
        user.isLoggedIn && <div>
          <h3> Welcome {user.name} </h3>
          <p>your email is : {user.email} </p>
          <img src={user.photo} alt="" />
        </div>
      }
      {/* For sign up section */}

      <h3>Our own authentication</h3>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New user sign up</label>

      <form onSubmit={handleSubmit} >
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
        <br />
        <input type="text" onBlur={handleBlur} name="email" placeholder="Enter your email" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter your password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Log in'} />
      </form>

      <p style={{ color: 'red' }} >{user.error}</p>
      {
        user.success && <h4 style={{ color: 'green' }} > User {newUser ? 'created' : 'Logged in'} successful </h4>
      }
    </div>
  );
}

export default Login;


