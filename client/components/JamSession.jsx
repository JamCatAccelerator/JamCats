import React, { Component } from 'react'
import Track from './Track'
// function JamSession(props) {
// // console.log('JamSession: ',  props.playlist);
// return (
//     <div id="existing-jam-sessions" className="column is-half box">
//         <h2>{props.playlist.name}</h2>
//         <button className="button is-primary" onClick={()=>{props.activateJamSession('Jam Id')}}>ACTIVATE</button>
//         <button className="button is-primary" onClick={()=>{console.log('DELETE')}}>DELETE</button>
//     </div>
// )
// }

class JamSession extends Component {
    render() {
        console.log(this.props.playlist.id);
        const tracks = [];
        this.props.playlist.tracks.items.forEach(track => {
            tracks.push(<Track name={track.track.name} artist={track.track.artists[0].name} />)
        })
        console.log(this.props.playlist.tracks.items);
        if(!this.props.activated){
            return (
                <div id="existing-jam-sessions" className="column is-half card box">
                    <h2>Title: {this.props.playlist.name}</h2>
                    {tracks}
                    <button className="button is-primary" onClick={()=>{this.props.activateJamSession(this.props.playlist.id)}}>ACTIVATE</button>
                    <button className="button is-primary" onClick={()=>{console.log('DELETE')}}>DELETE</button>
                </div>
            )
        }else{
            return (
                <div id="existing-jam-sessions" className="column is-half card box">
                    <h2>Title: {this.props.playlist.name}</h2>
                    {tracks}
                </div>
            )
        }

    }
}

export default JamSession