import React, { useState } from 'react'


const ActiveJamSessionContainer = (props) => {
  return (
    <div>
        <h1>{props.currentJamSession}</h1>
        <button className="button is-light" onClick={()=>{props.deactivateJamSession()}}>DEACTIVATE</button>
    </div>  
  )
}

export default ActiveJamSessionContainer