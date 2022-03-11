import React from 'react'

function JamSession(props) {
// console.log('JamSession: ',  props.playlist);
return (
    <div id="existing-jam-sessions" className="column is-half box">
        <p>{props.playlist.name}</p>
        {/* {JSON.stringify(props.jamSession)}
        {JSON.stringify(props.playlist)} */}
        <button className="button is-primary" onClick={()=>{props.activateJamSession('Jam Id')}}>ACTIVATE</button>
    </div>
)
}

export default JamSession