import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.jsx';
import LoginContainer from './LoginContainer.jsx';
import HomeContainer from './HomeContainer.jsx';

function MainContainer() {
  let [isAuthenticated, setAuthenticationStatus] = useState(false);
  let [userObj, setUserObj] = useState([{ 
    spotifyProfile:'spotifyProfile', 
    dbInfo:'dbInfo', 
    authenticated:'authenticated', 
    jamSessions:'jamSessions', 
    playlists:'playlists'
  }]); //{ spotifyProfile, dbInfo, authenticated, jamSessions, playlists }

  useEffect ( () => {
    // let authStatus = confirm('would you like to log in')
    // setAuthenticationStatus(authStatus);
    fetch('http://localhost:8080/user/info')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // setAuthenticationStatus(true);
      // setUserObj(data);
    })
    .catch((error) => {console.error('Error useEffect:', error);})
  },[])
  

  if (!isAuthenticated){
    console.log('SHOULD BE FALSE-> ', isAuthenticated)
    return (
      <div>
        <div>
          <Navbar isAuthenticated={isAuthenticated}/>
          <LoginContainer/>
        </div>
      </div>
    )
  }else{
    console.log('SHOULD BE TRUE -> ', isAuthenticated)
    return(
    <div>
        <div><Navbar isAuthenticated={isAuthenticated}/></div>
        <HomeContainer userObj = {userObj}
        />
    </div>
    );
  }
}

export default MainContainer;