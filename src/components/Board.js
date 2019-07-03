import React, { Component } from 'react';
import BoardRow from './BoardRow'

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      row: 6,
      col: 7,
      emptyPlace: "white",
      board: Array.from(Array(6), () => new Array(7).fill(this.emptyPlace)),
      redIsNext: true,
      winner: "",
      pieces: 0,
    };

  }

  handleClickCallback = (row, col) => {
    if (this.state.winner === "" && !this.isFull()) {
      const s = this.state.board.slice();
      let i = this.state.row - 1
      while (i >= 0 && s[i][col] !== this.emptyPlace) {
        i--;
      }
      if (i >= 0) {
        s[i][col] = this.getPlayer();
        let w = this.calculateWinner(s, i, col);
        this.setState({
          board: s,
          redIsNext: !this.state.redIsNext,
          winner: w,
          pieces: this.state.pieces+1,
        });
      }
    }

  }

  renderRows() {
    const items = []

    for (let i = 0; i < this.state.row; i++) {
      items.push(
        <div className="board-row" key={i}>
          <BoardRow
            row={i}
            cols={this.state.col}
            board={this.state.board[i]}
            onClick={this.handleClickCallback}
          />
        </div>);
    }

    return (
      <div>
        {items}
      </div>
    )
  }

  isFull(){
    return (this.state.pieces === (this.state.row * this.state.col));
  }

  getPlayer(){
    return (this.state.redIsNext ? 'red' : 'yellow');
  }

  render() {

    let message;
    if (this.state.winner !== "") {
      message = "Winner " + this.state.winner + "!!!";
    } else if (this.isFull()){
      message = "Tied Game";
    }else{
      message = 'Player: ' + this.getPlayer();
    }

    return (
      <div>
        <div className="status">{message}</div>
        {this.renderRows()}
      </div>
    )
  }

  calculateWinner(board, row, col) {
    //horizontal check 
    for (let r = 0; r < this.state.row - 3; r++) {
      if (board[r][col] !== this.emptyPlace && board[r][col] === board[r + 1][col] && board[r][col] === board[r + 2][col] && board[r][col] === board[r + 3][col]) {
        return board[row][col];
      }
    }

    //vertical check
    for (let c = this.state.col - 1; c >= 3; c--) {
      if (board[row][c] !== this.emptyPlace && board[row][c] === board[row][c - 1] && board[row][c] === board[row][c - 2] && board[row][c] === board[row][c - 3]) {
        return board[row][col];
      }
    }

    //right diagonal check
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] !== this.emptyPlace && board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) {
          return board[row][col];
        }
      }
    }

    //left diagonal check
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c] !== this.emptyPlace && board[r][c] === board[r - 1][c - 1] && board[r][c] === board[r - 2][c - 2] && board[r][c] === board[r - 3][c - 3]) {
          return board[row][col];
        }
      }
    }

    return "";
  }

}

export default Board