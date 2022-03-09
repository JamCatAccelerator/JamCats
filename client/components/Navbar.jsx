import React from 'react'
/**
 * isAuthenticated = bool;'
 * hasActiveJamSession = bool;
 * activeJamSession = jamSessionObject;
 * userJamSessions = arrayOfJamSessions
*/


// function () => {
//   const [isSending, setIsSending] = useState(false)
//   const sendRequest = useCallback(async () => {
//     // don't send again while we are sending
//     if (isSending) return
//     // update state
//     setIsSending(true)
//     // send the actual request
//     await API.sendRequest()
//     // once the request is sent, update state again
//     setIsSending(false)
//   }, [isSending]) // update the callback if the state changes

//   return (
//     <input type="button" disabled={isSending} onClick={sendRequest} />
//   )
// }


function Navbar(props) {
    if (!props.isAuthenticated){
      return (
        <nav className='navbar'>
          <div className='navbar-brand'>
            <div className='navbar-item'>
              <h1>JAM CATS</h1>
           </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href='/login/oauth' className="button is-light">
                  Log in
                </a>
              </div>
            </div>
          </div>
       </nav>
      )
    }
    else{
      <nav className='navbar'>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <h1>JAM CATS</h1>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
        </div>
      </div>
      </nav>
    }
}

export default Navbar;

{/* <a className="button is-primary">
<strong>Sign up</strong>
</a> */}