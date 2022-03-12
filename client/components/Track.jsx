import React, { Component } from 'react'

class Track extends Component {
    render() {
        return(
            <div>
                <p><strong>{this.props.name}</strong> - {this.props.artist}</p>
            </div>
        )
    }
}

export default Track