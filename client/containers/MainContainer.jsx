import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import LoginContainer from './LoginContainer.jsx';
import HomeContainer from './HomeContainer.jsx';

function MainContainer() {
  // 5 components of state: authentication status, spotify profile,
  // dbInfo for user, jam sessions, spotify playlists
  const [isAuthenticated, setAuthenticationStatus] = useState(false);
  const [spotifyProfile, setSpotifyProfile] = useState({});
  const [dbInfo, setDbInfo] = useState({})
  const [jamSessions, setJamSessions] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const createJamSession = (props) => {
    const newJamSessions = props.jamSessions;
    const newPlaylists = props.playlists;
    const playlistName = document.getElementById('session-name').value;
    document.getElementById('session-name').value = '';
    const isPublic = document.querySelector('input[name="public"]:checked').value;
    if (!playlistName) return;
    fetch('/jamSession/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playlistName: playlistName,
        isPublic: isPublic,
        id: props.spotifyId,
      }),
    })
      .then(data => data.json())
      .then(data => {
        // update jamSessions part of state with new session
        // update playlists part of state with new playlist
        newJamSessions.push(data.jamSession);
        newPlaylists.push(data.playlist)
        setJamSessions(newJamSessions);
        setPlaylists(newPlaylists);
      });
  }
  
  useEffect ( () => {
    fetch('http://localhost:8080/user/info')
    .then(res => res.json())
    .then(data => {      
      setSpotifyProfile(data.spotifyProfile)
      setAuthenticationStatus(data.authenticated);
      setJamSessions(data.jamSessions);
      setDbInfo(data.dbInfo);
      setPlaylists(data.playlists);
    })
    .catch((error) => {console.error('Error:', error);})
  },[])
  
  if (!isAuthenticated) {
    console.log('authentication passed')
    return (
      <div id="login-page">
          <Navbar isAuthenticated={isAuthenticated}/>
          <LoginContainer />
      </div>
    )
  } else {
    return(
      <div id="home-page">
        <Navbar spotifyProfile={spotifyProfile} isAuthenticated={isAuthenticated}/>
        <HomeContainer jamSessions={jamSessions} playlists={playlists} spotifyId={dbInfo.spotifyId} createJamSession={createJamSession}/>
      </div>
    );
  }
}

export default MainContainer;

 // let [userObj, setUserObj] = useState(
  //   {
  //     authenticated:false,
  //     spotifyProfile:{},
  //     dbInfo:{},
  //     jamSessions:[],
  //     playlists:[],
  //   }); 
  
 /* userObj= {
    "authenticated":true,
    "spotifyProfile":{
      "display_name":"David Sharfi",
      "email":"spotify@djs.gg",
      "href":"https://api.spotify.com/v1/users/dsharfi",
      "images":[{"height":null,"url":"https://scontent-iad3-2.xx.fbcdn.net/v/t1.18169-1/20992652_10155665933208739_6263703377664512260_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-5&_nc_sid=0c64ff&_nc_ohc=KTPtT7PhsooAX_f0xuU&_nc_ht=scontent-iad3-2.xx&edm=AP4hL3IEAAAA&oh=00_AT_CGEtSkyCVGO_fwF2seecW-bjGqbyoruW-dObE4W7zrw&oe=625155AE","width":null}]
    },
    "dbInfo":{
      "_id":"622a2ead3f7ddccf31b576cf",
      "spotifyId":"dsharfi",
      "jamSessions":[],
      "__v":0
    },
    "jamSessions":[],
    "playlists":[]
  }*/