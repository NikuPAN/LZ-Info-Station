import React, { Component, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import RankingTop10 from './RankingTop10';
import { Trans, withTranslation } from 'react-i18next';
 
class Ranking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventDetail: [],
      maintainenceHr: 0.00,
      darkMode: true,
      trackingIDs: [
        {id: 0, gameId: 0, name: ""}, 
        {id: 1, gameId: 0, name: ""}, 
        {id: 2, gameId: 0, name: ""}, 
        {id: 3, gameId: 0, name: ""}, 
        {id: 4, gameId: 0, name: ""},
        {id: 5, gameId: 0, name: ""}
      ],
    };
    this.top10Ref = createRef();
  }

  onChangeLanguage = () => {
    console.log("onChangeLanguage in Ranking.js has been called!");
    this.top10Ref.current.onChangeLanguage();
  }

  getAllData = () => {
		let data = fetch("https://cronpublic.yasushi.me/ranking.json")
    .then(response => response.json())
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

  onTrackIDChange(id, e) {
    var index = this.state.trackingIDs.findIndex(x => x.id === id);
    if (index !== -1) {
      // console.log("field game_id id: "+index, "val: "+e.target.value);
      let temp = [...this.state.trackingIDs];
      temp[index].gameId = parseInt(e.target.value);
      this.setState({
        trackingIDs: [
          ...temp
          //  ...this.state.trackingIDs.slice(0, index),
          //  Object.assign({}, this.state.trackingIDs[index], {id: e.target.value}),
          //  ...this.state.trackingIDs.slice(index + 1)
        ]
      });
      // console.log(this.state.trackingIDs[index]);
    }
    else {
      console.log("Nothing match (game id field).")
    }
  }

  onTrackNameChange(id, e) {
    var index = this.state.trackingIDs.findIndex(x => x.id === id);
    if (index !== -1) {
      // console.log("field name id: "+index, "val: "+e.target.value);
      let temp = [...this.state.trackingIDs];
      temp[index].name = e.target.value;
      this.setState({
        trackingIDs: [...temp]
      });
      // console.log(this.state.trackingIDs[index]);
    }
    else {
      console.log("Nothing match (name field).")
    }
  }

  render() {
    return (
      <div>
          <div>
            <h2 style={{ fontStyle:"italic" }}>TOP 10 - <b>{this.state.eventDetail.eventName} ({this.state.eventDetail.eventId})</b></h2>
            <h4>
              <Trans>START_DATE</Trans>: <b>{this.state.eventDetail.startDate} </b> 
              | <Trans>EV_DURATION</Trans>: <b>{this.state.eventDetail.eventDurationHr} <Trans>HOUR</Trans></b>
            </h4>
            <RankingTop10
              data={this.state.eventDetail}
              trackData={this.state.trackingIDs}
              eventStartTimestamp={this.state.eventDetail.startAt}
              eventDuration={this.state.eventDetail.eventDurationHr}
              maintainenceHr={this.state.maintainenceHr}
              ref={this.top10Ref}
            />
          </div>
          <div className="trackDetail left">
            {this.state.trackingIDs.map((tracking, i) => (
              <div>
                <TextField
                  label="玩家ID"
                  type="number"
                  style={{ background: "white", borderRadius: "5px" }}
                  defaultValue={tracking.gameId}
                  onChange={i, e => this.onTrackIDChange(i, e)}
                  name={"track_id"+i}
                  variant="filled"
                  margin="dense"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                &nbsp;
                <TextField
                  label="自行更改暱稱"
                  style={{ background: "white", borderRadius: "5px" }}
                  defaultValue={tracking.name}
                  onChange={i, e => this.onTrackNameChange(i, e)}
                  name={"track_name"+i}
                  variant="filled"
                  margin="dense"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="trackDetail right">
            <h1>Multi-axis chart</h1><br/>
            <h1>Multi-axis chart</h1><br/>
            <h1>Multi-axis chart</h1>
          </div>
      </div>
    );
  }
}

export default withTranslation()(Ranking);