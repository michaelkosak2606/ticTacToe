import React, { Component } from "react";
import "./Styles.css";

export default class RestartButton extends Component {
    render() {
        return (
            this.props.data !== null ?
                <button className="restartButton" onClick={this.props.restartGame}>
                    {this.props.checkWhoWins}
                    <span>Restart the game</span>
                </button>
                :
                <div className="zenContainer">
                    <p className="zenQuoteAnnouncement">Random Zen quote:</p>
                    <div className="zenQuoteWindow"> {this.props.zenQuote}</div>
                </div>
        )
    }

}