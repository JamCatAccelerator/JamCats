//import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import HomeContainer from './HomeContainer';
import Navbar from '../components/Navbar';
import LoginContainer from './LoginContainer';
import React, { useEffect, useState } from 'react';
/**
 * isAuthenticated = bool;'
 * hasActiveJamSession = bool;
 * activeJamSession = jamSessionObject;
 * userJamSessions = arrayOfJamSessions
*/
const  MainContainer = (props) => {
  let [isAuthenticated, setAuthenticationStatus] = useState(false);
  let [userInfo, setUserInfo] = useState({});

  useEffect(()=>{
    fetch('http://localhost:8080/user/info')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAuthenticationStatus(true);
        setUserInfo = data;
      })
      .catch((error) => {console.error('Error:', error);})
  }, []);
  
  if (!isAuthenticated){
    return (
      <div>
        <div><Navbar isAuthenticated={isAuthenticated}/></div>
         <div><LoginContainer/></div>
      </div>
    )
  };
  return(
    <div>
      <div><Navbar isAuthenticated={isAuthenticated}/></div>
      <div><HomeContainer userInfo={userInfo}/></div>
   </div>
  );
}


export default MainContainer;


// //else
// return (
//   //<Home />
//   //(if !activeJamSession)
//     //<CreateJamSession/>
//     //<SavedJamSession/>
//     //else
//      //<ActiveJamSession/> (presents as new page)
//       //<AddSong/>
//       //<JamSessionTrackList/>
// )


{/* <Navbar />
<div className='content'>
  {/* currently grouping all pages on App component. Will separate with react router */}
//   <div className='box' id="main-dashboard">
//     <Home/>
//   </div>
//   <div className='box' id="queue-dashboard">
//     {/* 
//     search bar
//     queue container
//       song card info
//     control buttons
//     users in session container
//     logout button
//       */}

//   </div>
// </div> */}