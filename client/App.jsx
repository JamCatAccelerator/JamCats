import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import HomeContainer from './containers/HomeContainer';
import Navbar from './components/Navbar';
import MainContainer from './containers/MainContainer';

class App extends Component {
  render() {

    return (
      <div id="main-container">
        <MainContainer/> 
      </div>
    );
  }
}

export default App;