import React, { useState } from 'react'
import JamSessionContainer from './JamSessionContainer'
import ActiveJamSessionContainer from './ActiveJamSessionContainer'
import CreateJamSession from '../components/CreateJamSession'

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
  
function HomeContainer(props) {
  let [hasActiveJamSession, setActiveJamSessionStatus] = useState(false);
  let [currentJamSession, setCurrentJamSession] = useState('');
  //if (noActiveJamSession)
  
  const activateJamSession = (jamSessionID) =>{
    setActiveJamSessionStatus(true);
    setCurrentJamSession(jamSessionID);
  }
  const deactivateJamSession = () =>{
    setActiveJamSessionStatus(false);
    setCurrentJamSession('');
  }


  if(!hasActiveJamSession){
    return(
      <div id="jam-session-container" className='card-dashboard'>
        <header className='card-header'>
          <div className='card-header-title is-6'>
            JAM SESSION DASHBOARD          
          </div>
        </header>
        <CreateJamSession jamSessions={props.jamSessions} playlists={props.playlists} spotifyId={props.spotifyId} createJamSession={props.createJamSession}  />
        <br></br>
        <br></br>
        <JamSessionContainer jamSessions={props.jamSessions} playlists={props.playlists} activateJamSession={activateJamSession} />
      </div>
    )
  }
  else {
    return (
      <div id="active-jam-session" className='card-dashboard'>
        <header className='card-header'>
          <div className='card-header-title is-6'>
            CURRENT JAM SESSSION
          </div>
        </header>
        <ActiveJamSessionContainer currentJamSession = {currentJamSession} deactivateJamSession = {deactivateJamSession}/>
      </div>
    )
 }
}

export default HomeContainer