import React, { Component, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import RankingTop10 from "./RankingTop10";
 
class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: "RAISE A SUILEN～御簾を上げろ～（前編）",
      eventStartDate: "2020-6-10",
      eventStartTime: "15:00",
      eventDurationHr: 198,
      roundMaxPoint: 22830,
      fastestRoundSec: 125
    };
  }
  render() {
    return (
      <div>
        <h2>TOP 10 - <b>{this.state.eventTitle}</b></h2>
        {/* <h4>スタート日: <b>{this.state.eventStartDate}</b></h4>
        <h4>イベント時間: <b>{this.state.eventDurationHr}</b></h4>
        <h4>周回理論PT: <b>{this.state.roundMaxPoint}</b></h4>
        <h4>周回理論時間: <b>{this.state.fastestRoundSec} 秒</b></h4> */}
        <h4>
          スタート日: <b>{this.state.eventStartDate} </b> | 
          イベント時間: <b>{this.state.eventDurationHr}</b> | 
          周回理論PT: <b>{this.state.roundMaxPoint}</b> |
          周回理論時間: <b>{this.state.fastestRoundSec} 秒</b>
        </h4>
        <br/>
        <RankingTop10 />
      </div>
    );
  }
}

export default Ranking;