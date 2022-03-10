import React from 'react'

function JamSession(props) {

return (
    <div id="existing-jam-sessions">
        JAM Session {props.id}
        {JSON.stringify(props.userObj)}
        <button className="button is-primary" onClick={()=>{props.activateJamSession('Jam Id')}}>ACTIVATE</button>
    </div>
)
}

export default JamSession