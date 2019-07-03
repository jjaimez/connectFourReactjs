import React, { Component } from 'react';

class BoardRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: props.board,
      cols: props.cols,
      row: props.row,
    };
  }

  render() {
    const butons = []

    for (let c = 0; c < this.state.cols; c++) {
      let key = this.state.row +","+ c;
      butons.push(
      <button 
          key={key}
          className="circle"
          style={{ backgroundColor: this.state.board[c]}} 
          onClick={() => this.props.onClick(this.state.row, c)}/* {this.state.row}, {c} */></button>)
    }

    return (
      <div>
        {butons}
      </div>
    )
  }
}

export default BoardRow