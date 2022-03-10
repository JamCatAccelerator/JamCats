import React, { useState } from 'react'
import JamSession from '../components/JamSession';

function JamSessionContainer(props) {

// const jSessions = [];
// for (let i = 0; i < props.userJamSessions; i++){
//     jSessions.push(<JamSession id={i} activateJamSession = {activateJamSession}/>)
// }
return (
    <div id="jam-sessions">
        {/* {jSessions}; */}
        <JamSession userObj={props.userObj} activateJamSession = {props.activateJamSession}/>
    </div>
)
}

export default JamSessionContainer