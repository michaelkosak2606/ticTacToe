import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";

export default class Board extends Component {
  //Funktionen

  render() {
    return (
      <main className="board">
        <Square
          pointerStyle={this.props.pointerStyle(0)}
          styleName="leftColumn"
          click={() => this.props.nextClick(0)}
          text={this.props.data.squares[0]}
        />
        {/* <Square click={() => this.props.nextClick2()} />  so würde man Funktion/props an weitere Komponente übergeben*/}
        <Square
          pointerStyle={this.props.pointerStyle(1)}
          click={() => this.props.nextClick(1)}
          text={this.props.data.squares[1]}
        />
        <Square
          pointerStyle={this.props.pointerStyle(2)}
          click={() => this.props.nextClick(2)}
          text={this.props.data.squares[2]}
        />
        <Square
          pointerStyle={this.props.pointerStyle(3)}
          styleName="leftColumn"
          click={() => this.props.nextClick(3)}
          text={this.props.data.squares[3]}
        />
        <Square
          pointerStyle={this.props.pointerStyle(4)}
          click={() => this.props.nextClick(4)}
          text={this.props.data.squares[4]}
        />
        <Square
          pointerStyle={this.props.pointerStyle(5)}
          click={() => this.props.nextClick(5)}
          text={this.props.data.squares[5]}
        />
        <Square
          pointerStyle={this.props.pointerStyle(6)}
          styleName="leftColumn bottomRow"
          click={() => this.props.nextClick(6)}
          text={this.props.data.squares[6]}
        />
        <Square
          pointerStyle={this.props.pointerStyle(7)}
          styleName=" bottomRow"
          click={() => this.props.nextClick(7)}
          text={this.props.data.squares[7]}
        />
        <Square
          pointerStyle={this.props.pointerStyle(8)}
          styleName=" bottomRow"
          click={() => this.props.nextClick(8)}
          text={this.props.data.squares[8]}
        />
      </main>
    );
  }
}
