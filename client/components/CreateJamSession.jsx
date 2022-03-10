import React from 'react'

const CreateJamSession = props => {


  return (
    <div>
      <form onSubmit={() => {}}>
        <label>Create Session</label>
        <br></br>
        <input id="search-song" placeholder="Enter session name"/>
        <br></br>
        <input type="radio" name="publicORprivate" value="Public"  id="publicRadioBtn"/>
        <label for="publicRadioBtn">Public</label>
        <input type="radio" name="publicORprivate" value="Private" id="privateRadioBtn"/>
        <label for="privateRadioBtn">Private</label>
        <br></br>
        <button id="search" type="submit" className="button is-primary">Create Jam Sesssion</button> 
      </form>
    </div>
  )
}

export default CreateJamSession