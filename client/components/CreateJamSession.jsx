import React from 'react'

const CreateJamSession = props => {

  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault();
          props.createJamSession(props);
        }}>
        <label>Create Session</label>
        <br></br>
        <input id="session-name" placeholder="Enter session name"/>
        <br></br>
        <input type="radio" name="public" value={true}  id="publicRadioBtn"/>
        <label htmlFor="publicRadioBtn">Public</label>
        <input type="radio" name="public" value={false} id="privateRadioBtn" checked/>
        <label htmlFor="privateRadioBtn">Private</label>
        <br></br>
        <button id="search" type="submit" className="button is-primary">Create Jam Sesssion</button> 
      </form>
    </div>
  )
}

export default CreateJamSession