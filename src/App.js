import React, { Component } from 'react'
import Game from './Game'

class App extends Component {
  render() {
    return (
      <div className="app">
        Use [←][↑][↓][→] to MOVE<br/>
        <Game/>
      </div>
    );
  }
}

export default App;
