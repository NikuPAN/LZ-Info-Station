import React, { Component } from 'react';
import RankingTop10 from './RankingTop10';
 
class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetail: [],
      roundMaxPoint: 17350,
      fastestRoundSec: 125,
      maintainenceHr: 0.00
    };
  }

  async getAllData() {
		let response = await fetch("https://cronpublic.yasushi.me/ranking.json");
		let data = await response.json();
		return data;
  }

  updateAllData = () => {
		// This is an async function.
		this.getAllData()
		.then(res => {
			return {
				lastModified: res.lastModified,
        topUsers: res.topUsers,
        eventId: res.eventId,
        eventName: res.eventName,
        startAt: res.startAt,
        endAt: res.endAt,
        startDate: this.timestampToDate(res.startAt),
        startTime: this.timestampToTime(res.startAt),
        eventDurationHr: Math.round((res.endAt - res.startAt) / (60 * 60))
			};
		})
    .then(ranks => this.setState({ eventDetail: ranks }));
  }

  async componentDidMount() {
    // Call for first time without delay.
    this.updateAllData();
		const interval = setInterval(() => {
			// Loop from second request.
      this.updateAllData();
		}, 59000);
		return () => clearInterval(interval);
  }

  // Reason why is because the number won't update imeediately if we use update function
  timestampToDate(timestamp) {
    var fullDate = new Date(timestamp * 1000);
    var date = fullDate.getFullYear()
      +"-"+((fullDate.getMonth()+1)<10?"0"+(fullDate.getMonth()+1):(fullDate.getMonth()+1))
      +"-"+(fullDate.getDate()<10?"0"+fullDate.getDate():fullDate.getDate());
    return date;
  }

  timestampToTime(timestamp) {
    var fullDate = new Date(timestamp * 1000);
    var time = (fullDate.getHours()<10?"0"+fullDate.getHours():fullDate.getHours())
      +":"+(fullDate.getMinutes()<10?"0"+fullDate.getMinutes():fullDate.getMinutes());
    return time;
  }

  render() {
    return (
      <div>
          <div>
            <h2>TOP 10 - <b>{this.state.eventDetail.eventName} ({this.state.eventDetail.eventId})</b></h2>
            <h4>
              スタート日: <b>{this.state.eventDetail.startDate} </b> 
              | イベントデュレーション: <b>{this.state.eventDetail.eventDurationHr} 時間</b>
            </h4>
            <h5>
              周回理論PT: <b>{this.state.roundMaxPoint}</b> <br/>
              周回理論時間: <b>{this.state.fastestRoundSec} 秒</b>
            </h5>
            <RankingTop10 
              data={this.state.eventDetail}
              eventStartTimestamp={this.state.eventDetail.startAt}
              eventDuration={this.state.eventDetail.eventDurationHr}
              roundMaxPt={this.state.roundMaxPoint}
              fastestRound={this.state.fastestRoundSec}
              maintainenceHr={this.state.maintainenceHr}
            />
          </div>
      </div>
    );
  }
}

export default Ranking;