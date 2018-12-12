import React, { Component } from "react";
import "./components/Styles.css";
import Board from "./components/Board";
import RestartButton from "./components/RestartButton";

class App extends Component {
  state = {
    squares: Array(9).fill(null),
    playerXTurn: true,
    gameEnded: false,
    turn: 1,
    history: { 0: Array(9).fill(null) },
    zen: "",
    error: null
  };

  handleClick = a => {
    let turn = this.state.turn;
    let history = { ...this.state.history };
    let newSquares = [...this.state.squares];

    if (newSquares[a] === null && this.state.gameEnded === false) {
      this.state.playerXTurn === true
        ? (newSquares[a] = "X")
        : (newSquares[a] = "O");
      this.setState(
        {
          playerXTurn: !this.state.playerXTurn,
          turn: this.state.turn + 1,
          squares: newSquares,
        },
        () => {
          let updatedSquares = [...this.state.squares];
          let updatedHistory = { ...history, [turn]: updatedSquares };
          this.setState({
            history: updatedHistory
          },
            () => {
              if (this.checkWhoWins() !== null) {
                this.setState({
                  gameEnded: !this.state.gameEnded
                });
              }
            });

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
    let rightDiagonal = [];
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
      if (i % 2 === 0 && i > 0 && i < newSquares.length - 1) {
        rightDiagonal.push(newSquares[i]);
      }
    }
    return {
      one: columnOne,
      two: columnTwo,
      three: columnThree,
      four: leftDiagonal,
      five: rightDiagonal
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
    const compareX = JSON.stringify(xWins);
    const compareO = JSON.stringify(oWins);
    let resultOfTheGame =
      JSON.stringify(newSquares.slice(0, 3)) === compareX ||
        JSON.stringify(newSquares.slice(3, 6)) === compareX ||
        JSON.stringify(newSquares.slice(6, 9)) === compareX ||
        JSON.stringify(this.compareColumns().one) === compareX ||
        JSON.stringify(this.compareColumns().two) === compareX ||
        JSON.stringify(this.compareColumns().three) === compareX ||
        JSON.stringify(this.compareColumns().four) === compareX ||
        JSON.stringify(this.compareColumns().five) === compareX
        ? "Player X wins!"
        : JSON.stringify(newSquares.slice(0, 3)) === compareO ||
          JSON.stringify(newSquares.slice(3, 6)) === compareO ||
          JSON.stringify(newSquares.slice(6, 9)) === compareO ||
          JSON.stringify(this.compareColumns().one) === compareO ||
          JSON.stringify(this.compareColumns().two) === compareO ||
          JSON.stringify(this.compareColumns().three) === compareO ||
          JSON.stringify(this.compareColumns().four) === compareO ||
          JSON.stringify(this.compareColumns().five) === compareO
          ? " Player O wins!"
          : this.inArray(null, newSquares)
            ? "Draw"
            : null;

    return resultOfTheGame;
  }
  restartGame = () => {
    this.loadZen();
    let newSquares = Array(9).fill(null);
    this.setState({
      squares: newSquares,
      playerXTurn: true,
      gameEnded: false,
      turn: 1,
      history: { 0: Array(9).fill(null) }
    });
  };
  pointerStyleSquare = a => {
    const newSquares = [...this.state.squares];
    return newSquares[a] !== null && "noPointer";
    // if(newSquares[a] !== null ) {return "noPointer"}
  };
  timeTravel = goToTurnNumber => {
    this.loadZen();

    let history = { ...this.state.history };
    let keysOfHistory = Object.keys(history).slice(0, goToTurnNumber);

    let backInTimeHistory = keysOfHistory.reduce((obj, key) => {
      obj[key] = history[key];
      return obj;
    }, {});
    let ok = goToTurnNumber - 1;
    let playersTurn = goToTurnNumber % 2 === 1 ? true : false;

    this.setState({
      squares: backInTimeHistory[ok],
      playerXTurn: playersTurn,
      gameEnded: false,
      turn: goToTurnNumber,
      history: backInTimeHistory
    });
  };
  loadZen = () => {
    fetch("https://api.github.com/zen")
      .then(data => data.text())
      .then(zen => this.setState({ zen }))
  };

  async componentDidMount() {
    try {
      const response = await fetch("https://api.github.com/zen");

      if (!response.ok) {
        throw Error(response.statusText);
      }
      const text = await response.text();
      await this.setState({ zen: text, error: null });
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  render() {
    //Statusanzeige: wer dran ist:
    let status = "Player  " + (this.state.playerXTurn ? "X" : "O") + "'s turn";
    //Zen API CHECK
    let zenQuoteStatus =
      this.state.zen.length < 100 ? this.state.zen : <p>Error occured...</p>;

    //gameHistoryButtons
    let history = { ...this.state.history };
    let keysOfHistory = Object.keys(history);
    keysOfHistory.shift();
    const gameHistoryButtons = keysOfHistory.map((turnNumber, index) => {
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

          <RestartButton
            data={this.checkWhoWins()}
            restartGame={this.restartGame}
            checkWhoWins={this.checkWhoWins()}
            zenQuote={zenQuoteStatus}
          />
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
