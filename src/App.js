import React, { Component } from "react";
import "./components/Board.css";
import Board from "./components/Board";

class App extends Component {
  state = {
    squares: Array(9).fill(null),
    playerXTurn: true,
    gameEnded: false,
    history: { 0: Array(9).fill(null) },
    turn: 1
  };
  // updateHistory() {
  //   let turn = this.state.turn;
  //   let newSquares = [...this.state.squares];
  //   let history = { ...this.state.history };
  //   let updatedHistory = { ...history, [turn]: newSquares };
  //   return updatedHistory;
  // }
  handleClick = a => {
    //verstehen wieso es so funktioniert und wieso das andere evtl.
    // nicht funktioniert hat, wenn updateHistory in eigener Funktion ist
    // wird nur das array [null,...,null] in die history geaddet, also immer 1 Turn "zu spät"
    // s.d zwei gleiche arrays sich da drin befinden

    // instead of the function updateHistory:
    let turn = this.state.turn;
    let history = { ...this.state.history };
    let newSquares = [...this.state.squares];
    let updatedHistory = { ...history, [turn]: newSquares };

    if (newSquares[a] === null && this.state.gameEnded === false) {
      this.state.playerXTurn === true
        ? (newSquares[a] = "X")
        : (newSquares[a] = "O");
      this.setState(
        {
          playerXTurn: !this.state.playerXTurn,
          turn: this.state.turn + 1,
          squares: newSquares,
          history: updatedHistory
        },
        () => {
          this.setState({});
          if (this.checkWhoWins() !== null) {
            this.setState({
              gameEnded: !this.state.gameEnded
            });
          }
        }
      );
    }
  };

  compareColumns() {
    const newSquares = [...this.state.squares];
    let columnOne = [];
    let columnTwo = [];
    let columnThree = [];
    let leftDiagonal = [];
    for (let i = 0; i < newSquares.length; i++) {
      if (i % 3 === 0) {
        columnOne.push(newSquares[i]);
      }
      if (i % 3 === 1) {
        columnTwo.push(newSquares[i]);
      }
      if (i % 3 === 2) {
        columnThree.push(newSquares[i]);
      }
      if (i % 4 === 0) {
        leftDiagonal.push(newSquares[i]);
      }
    }
    return {
      one: columnOne,
      two: columnTwo,
      three: columnThree,
      four: leftDiagonal
    };
  }
  inArray(value, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return false;
      }
    }
    return true;
  }
  checkWhoWins() {
    const xWins = ["X", "X", "X"];
    const oWins = ["O", "O", "O"];
    const newSquares = [...this.state.squares];

    let winner =
      JSON.stringify(newSquares.slice(0, 3)) === JSON.stringify(xWins) ||
      JSON.stringify(newSquares.slice(3, 6)) === JSON.stringify(xWins) ||
      JSON.stringify(newSquares.slice(6, 9)) === JSON.stringify(xWins) ||
      JSON.stringify(this.compareColumns().one) === JSON.stringify(xWins) ||
      JSON.stringify(this.compareColumns().two) === JSON.stringify(xWins) ||
      JSON.stringify(this.compareColumns().three) === JSON.stringify(xWins) ||
      JSON.stringify(this.compareColumns().four) === JSON.stringify(xWins)
        ? "Player X wins!"
        : JSON.stringify(newSquares.slice(0, 3)) === JSON.stringify(oWins) ||
          JSON.stringify(newSquares.slice(3, 6)) === JSON.stringify(oWins) ||
          JSON.stringify(newSquares.slice(6, 9)) === JSON.stringify(oWins) ||
          JSON.stringify(this.compareColumns().one) === JSON.stringify(oWins) ||
          JSON.stringify(this.compareColumns().two) === JSON.stringify(oWins) ||
          JSON.stringify(this.compareColumns().three) ===
            JSON.stringify(oWins) ||
          JSON.stringify(this.compareColumns().four) === JSON.stringify(oWins)
        ? " Player O wins!"
        : this.inArray(null, newSquares)
        ? "Draw"
        : null;

    return winner;
  }
  restartGame = () => {
    let newSquares = Array(9).fill(null);
    this.setState({
      squares: newSquares,
      gameEnded: false,
      turn: 0,
      history: {}
    });
  };
  pointerStyleSquare = a => {
    const newSquares = [...this.state.squares];
    return newSquares[a] !== null && "noPointer";
    // if(newSquares[a] !== null ) {return "noPointer"}
  };
  timeTravel = goToTurnNumber => {
    console.log(goToTurnNumber);

    let history = { ...this.state.history };

    //if goToTurnNumber is 3, then we get an array of first 3 keys, which is [0,1,2]
    // because the history in turn 3 has exactly 3 elements and so on
    let keysOfHistory = Object.keys(history).slice(0, goToTurnNumber);

    //reducing the copy this.state.history to the elements
    // with keys from the array above, in this case {0:[...], 1:[...],2:[...]}
    let backInTimeHistory = keysOfHistory.reduce((obj, key) => {
      obj[key] = history[key];
      return obj;
    }, {});
    //this.state.squares has to get the value of the last
    let ok = goToTurnNumber - 1;

    this.setState({
      squares: backInTimeHistory[ok],
      history: backInTimeHistory,
      turn: goToTurnNumber,
      gameEnded: false
    });
    // console.log(this.state);
  };

  componentDidUpdate() {
    //loggt zwei identische states, wegen der callback Funktion
    // in setState in der handleClick Methode
    console.log(this.state);
  }

  render() {
    //Statusanzeige: wer dran ist:
    let status = "Player  " + (this.state.playerXTurn ? "X" : "O") + "'s turn";
    //Anzeige der Restart-Buttons:
    let buttonRestart = null;
    if (this.checkWhoWins() !== null) {
      buttonRestart = (
        <button className="restartButton" onClick={this.restartGame}>
          {this.checkWhoWins()}
          <span>Restart the game</span>
        </button>
      );
    }
    //gameHistoryButtons
    let history = { ...this.state.history };
    let keysOfHistory = Object.keys(history);
    keysOfHistory.shift();
    var gameHistoryButtons = keysOfHistory.map((turnNumber, index) => {
      let goToTurnNumber = Number(turnNumber);
      return (
        <button
          className="gameHistoryButton"
          key={turnNumber}
          onClick={() => this.timeTravel(goToTurnNumber)}
        >
          Go to turn : {goToTurnNumber}
        </button>
      );
    });

    return (
      <div className="game">
        <main className="leftSide">
          <div> {status} </div>
          <Board
            data={this.state}
            nextClick={this.handleClick}
            pointerStyle={this.pointerStyleSquare}
          />
          {buttonRestart}
        </main>
        <main className="rightSide">
          Turns
          {gameHistoryButtons}
        </main>
      </div>
    );
  }
}

export default App;