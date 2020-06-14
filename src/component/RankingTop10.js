import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import UserStore from "../stores/UserStore";

export default function RankingTop10({eventStartTimestamp, eventDuration, roundMaxPt, fastestRound}) {

	const [rawData, setRawData] = useState([]);
	const [rowRecord, setRowRecord] = useState([[]]);
	//const [rowData, setRowData] = useState([]);
	const [gridApi, setGridApi] = useState(null);

	// var gridData = [];
	var formattedTimestamp = timestampToDateTime(rawData.lastModified);
	var eventProgressed = getTimeDifference(rawData.lastModified, eventStartTimestamp);
		// var trackingIDs = [
	// 	{ id: 0, name: null },
	// 	{ id: 0, name: null },
	// 	{ id: 0, name: null },
	// 	{ id: 0, name: null },
	// 	{ id: 0, name: null }
	// ];

	const [columnDefs, setColumnDefs] = useState([
			{ headerName: "Top", field: "rank", sortable: true, filter: "agNumberColumnFilter", maxWidth: 80 },
			{ headerName: "ID", field: "name", sortable: true, filter: "agTextColumnFilter", minWidth: 150 },
			{ headerName: "イベントpt", field: "point", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 130 },
			{ headerName: "ボーナス", field: "bonus", sortable: true, filter: false, maxWidth: 100 },
			{ headerName: "1位差", field: "diff_1st", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 120 },
			{ headerName: "前位差", field: "diff_last", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 120 },
			{ headerName: "前位回数差", field: "diff_last_round", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 150 },
			{ headerName: "追撃時間", field: "catch_time", sortable: true, filter: false, maxWidth: 150 },
			{ headerName: "pt時速", field: "point_per_hour", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "平均周回時速", field: "round_per_hour", sortable: true, filter: false, maxWidth: 150 },
			{ headerName: "pt/10分", field: "point_10mins", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "pt/30分", field: "point_30mins", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "pt/60分", field: "point_60mins", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "休憩(min)", field: "rest", sortable: true, filter: false, maxWidth: 120 },
			//{ headerName: "玩家ID", field: "playerId", sortable: true, filter: false, maxWidth: 120 } 

	]);

	function numberFormatter(params) {
			// this puts commas into the number eg 1000 goes to 1,000,
			// i pulled this from stack overflow, i have no idea how it works
			return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function getTop10Data(data) {
		//console.log("getTop10 called");
		//console.log(data);
		let result = [];
		if(data.topUsers) {
			let top10 = data.topUsers;
			//console.log(top10.length);
			for (var i = 0; i < top10.length; i++) {
				result.push({
					rank: top10[i].rank,
					name: top10[i].name,
					rankLevel: top10[i].rankLevel,
					introduction: top10[i].introduction,
					userId: top10[i].userId,
					point: top10[i].point,
					userDeck: top10[i].userDeck,
					bonus: 0, // need to implement
					diff_1st: (i > 0 ? (top10[i].point - top10[0].point) : 0),
					diff_last: (i > 0 ? (top10[i].point - top10[i - 1].point) : 0),
					diff_last_round: (i > 0 ? Math.ceil((top10[i - 1].point - top10[i].point) / roundMaxPt)*-1 : 0),
					catch_time: secondsToHrsAndMins(i > 0 ? Math.ceil((top10[i - 1].point - top10[i].point) / roundMaxPt * fastestRound) : 0),
					point_per_hour: (top10[i].point / (eventProgressed / 3600)),
					round_per_hour: (top10[i].point / (eventProgressed / 3600) / roundMaxPt).toFixed(3),
					point_10mins: getPointDiffInPeriod(top10[i].userId, 10), // need to change
					point_30mins: getPointDiffInPeriod(top10[i].userId, 30), // need to change
					point_60mins: getPointDiffInPeriod(top10[i].userId, 60), // need to change
					rest: 0,
					playerId: top10[i].userId
				});
			}
		}
		return result;
	}

	function timestampToDateTime(timestamp) {
		var dateobj = new Date(timestamp * 1000);
		var yy = dateobj.getFullYear();
		var mm = dateobj.getMonth()+1;
		var dd = dateobj.getDate();
		var hh = dateobj.getHours();
		var min = dateobj.getMinutes();
		//var ss = dateobj.getSeconds();
		return (yy+'-'+(mm>=10?mm:'0'+mm)+'-'+(dd>=10?dd:'0'+dd)+' '
					+(hh>=10?hh:'0'+hh)+':'+(min>=10?min:'0'+min)/*+':'+(ss>=10?ss:'0'+ss)*/);
	}

	function getTimeDifference(timestamp1, timestamp2) {
		var result = 0;
		if(timestamp1 > timestamp2) {
			result = timestamp1 - timestamp2;
		} else {
			result = timestamp2 - timestamp1
		}
		return result;
	}

	// function for noobs.
	function secondsToHrsAndMins(second) {
		var hours = Math.floor(second / 3600);
		var mins = Math.floor(second / 60) - (hours * 60);
		return (hours+" 小時 "+mins+" 分鐘");
	}

  function onGridReady(params) {
		setGridApi(params.api);
		// params.api.sizeColumnsToFit();

		// var columnAPI = params.columnApi;
		// var allColumnIds = [];
    // columnAPI.getAllColumns().forEach(function(column) {
    //   allColumnIds.push(column.colId);
    // });
    // columnAPI.autoSizeColumns(allColumnIds, false);
	}

	// // not yet implemented
	// function updateTrackingID(event, id) {
	// 	var val = event.target.value;
	// 	if(isNaN(val)) {

	// 	}
	// 	trackingIDs[id].id = parseInt(event.target.value);
	// }

	async function getAllRecord() {
		let response = await fetch("https://cronpublic.yasushi.me/record.json");
		let data = await response.json();
		// console.log(data);
		return data;
	}

	async function getAllData() {
		let response = await fetch("https://cronpublic.yasushi.me/ranking.json");
		let data = await response.json();
		//console.log(data);
		return data;
  }

  function getSpecificIdRecord(array, userId) {
    let res = [];
    if(!array || array.length === 0)
      return null;
    for(var i = 0; i < array.length; i++) {
      for(var j = 0; j < array[i].length; j++) {
        if(array[i][j].userId === userId) 
          res.push(array[i][j].point);
      }
    }
    return res;
  }
  
  function getPointDiffInPeriod(userId, minutes) {
    let res = 0, latest_pt = 0, past_target_pt = 0, rec = [];
    // Unable to get difference more than 60 minutes.
    if(minutes > rowRecord.length)
      return 0;
    /** Fix calculation */
    rec = getSpecificIdRecord(rowRecord, userId);
    if(rec != null) {
      // Latest point of this userId
      latest_pt = rec[0];
      // To prevent get exceeded index from this array.
      if(minutes > rec.length-1) {
        past_target_pt = rec[rec.length - 1];
      } 
      else {
        past_target_pt = rec[minutes];
      }
      res = latest_pt - past_target_pt;
    }
    return res;
  }

	function updateAllData() {
		// This is an async function.
		getAllData()
		.then(res => {
			return {
				lastModified: res.lastModified,
				topUsers: res.topUsers
			};
		})
    .then(ranks => setRawData(ranks));
    
    // This is an async function.
    // DLLM都唔知寫左乜春。
		getAllRecord()
		.then(res =>
			res.map(item => {
        return item.map(top => {
          return {
            userId: top.userId,
            point: top.point
          };
        })
			}) 
		)
		.then(records => setRowRecord(records));
	}
	
  useEffect(() => {
		// Call for first time without delay.
		updateAllData();
		const interval = setInterval(() => {
			// Loop from second request.
			updateAllData();
		}, 59000);
		return () => clearInterval(interval);
  }, []);
  
  //console.log(rowRecord);

	return (
		<div>
			<div>
				{/* <h4>最終更新日時: {formattedTimestamp}</h4> */}
				{/* <h5>dump: {eventStartTimestamp}, {eventDuration}, {roundMaxPt}, {fastestRound} </h5> */}
				<h5>活動進度: {secondsToHrsAndMins(eventProgressed)} (剩餘: {secondsToHrsAndMins((eventDuration * 60 * 60) - eventProgressed)})
				</h5>
			</div>
			<div>
				<ProgressBar animated now={95} />
			</div>
			<div class="container">
				<div id="myGrid" className="ag-theme-alpine-dark" 
				style={{ height: "500px", width: "95%" }}>
					<AgGridReact
						columnDefs={columnDefs}
						rowData={getTop10Data(rawData)}
						onGridReady={onGridReady}
						// onRowClicked={}
						// pagination={true}
						// paginationPageSize={10}
					/>
				</div>
			</div>
			<div>
				<h5>最終更新日時: {formattedTimestamp}</h5>
			</div>
			{/* <div>
				<h6>
				<form>
					<tr>
						<td>ID</td>
						<td>顯示文字</td>
					</tr>
					<tr>
						<td><input id="trackID1" name="trackID1" type="number" onChange={updateTrackingID(0)} /></td>
						<td><input id="trackName1" name="trackName1" onChange={updateTrackingID(0)} /></td>
					</tr>
					<tr>
						<td><input id="trackID2" name="trackID2" type="number" onChange={updateTrackingID(1)} /></td>
						<td><input id="trackName2" name="trackName2" onChange={updateTrackingID(1)} /></td>
					</tr>
					<tr>
						<td><input id="trackID3" name="trackID3" type="number" onChange={updateTrackingID(2)} /></td>
						<td><input id="trackName3" name="trackName3" onChange={updateTrackingID(2)} /></td>
					</tr>
					<tr>
						<td><input id="trackID4" name="trackID4" type="number" onChange={updateTrackingID(3)} /></td>
						<td><input id="trackName4" name="trackName4" onChange={updateTrackingID(3)} /></td>
					</tr>
					<tr>
						<td><input id="trackID5" name="trackID5" type="number" onChange={updateTrackingID(4)} /></td>
						<td><input id="trackName5" name="trackName5" onChange={updateTrackingID(4)} /></td>
					</tr>
				</form>
				</h6>
			</div> */}
		</div>
	);
}