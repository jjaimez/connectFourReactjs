import React, { Component } from 'react';
import Board from './components/Board'

class App extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
        </div>
      </div>
    );
  }
}

export default App