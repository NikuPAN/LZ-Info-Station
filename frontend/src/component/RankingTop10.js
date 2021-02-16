import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function RankingTop10({data, eventStartTimestamp, eventDuration, roundMaxPt, fastestRound, maintainenceHr}) {

	const [rowRecord, setRowRecord] = useState([[]]);
	const [gridApi, setGridApi] = useState(null);
	const [darkMode, setDarkMode] = useState(true);

	var formattedTimestamp = timestampToDateTime(data.lastModified);
	var eventProgressed = getTimeDifference(data.lastModified, eventStartTimestamp);

	const [columnDefs, setColumnDefs] = useState([
			{ headerName: "Top", field: "rank", sortable: false, filter: false, maxWidth: 100 },
			{ headerName: "ID", field: "name", sortable: true, filter: "agTextColumnFilter", minWidth: 120 },
			{ headerName: "イベントpt", field: "point", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
			{ headerName: "ボーナス", field: "bonus", sortable: true, filter: false, maxWidth: 100 },
			{ headerName: "1位差", field: "diff_1st", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
			{ headerName: "前位差", field: "diff_last", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
			{ headerName: "前位回数差", field: "diff_last_round", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setDiffLastRoundCellStyle(params), maxWidth: 100 },
			{ headerName: "追撃時間", field: "catch_time", sortable: true, filter: false, cellStyle: params => setCatchTimeCellStyle(params, 60), maxWidth: 130 },
			{ headerName: "pt時速", field: "point_per_hour", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "周回時速", field: "round_per_hour", sortable: true, filter: false, maxWidth: 100 },
			{ headerName: "pt/10分", field: "point_10mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt), maxWidth: 90 },
			{ headerName: "pt/30分", field: "point_30mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt * 3), maxWidth: 90 },
			{ headerName: "pt/60分", field: "point_60mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt * 6), maxWidth: 90 },
      { headerName: "休憩(min)", field: "rest", sortable: true, filter: false, maxWidth: 100 },
      // { headerName: "玩家ID", field: "playerId", sortable: true, filter: false, maxWidth: 120 } 
      { headerName: "場次/hr", field: "valid_round", sortable: true, filter: false, maxWidth: 90 },
      { headerName: "瞬間時速", field: "speed_in_theory", sortable: true, filter: false, maxWidth: 100 },
      { headerName: "周回評價", field: "comment", sortable: true, filter: false, maxWidth: 100 },
  ]);

  function setDiffLastRoundCellStyle(params) {
    // Do not render style for Rank 1st
    if(params.node.data.rank === 1) // WTF am I doing??
      return null;
    let val = params.value;
    if(val < -85) {
      return { /*color: '#99cc33', fontWeight: 'bold', */ color: '#000', fontWeight: 'bold', backgroundColor: '#b7e1cd' }; // light green
    }
    else if(val <- 30 && val >= -85) {
      return { /*color: '#ffcc00', fontWeight: 'bold' , */ color: '#000', fontWeight: 'bold', backgroundColor: '#fce8b2' }; // light yellow
    }
    else if(val >= -30) {
      return { /*color: '#ff9966', fontWeight: 'bold' , */ color: '#000', fontWeight: 'bold', backgroundColor: '#f4c7c3' }; // light red
    }
    else return null;
  }

  // factor is minute
  function setCatchTimeCellStyle(params, factor) {
    // Do not render style for Rank 1st
    if(params.node.data.rank === 1) // WTF am I doing??
      return null;
    let val = fromTimeStrToMin(params.value);
    if(val > factor * 3) {
      return { /*color: '#99cc33'*/ color: '#000', fontWeight: 'bold' , backgroundColor: '#b7e1cd' }; // light green
    }
    else if(val > factor && val <= factor * 3) {
      return { /*color: '#ffcc00'*/ color: '#000', fontWeight: 'bold' , backgroundColor: '#fce8b2' }; // light yellow
    }
    else if(val >= 0 && val <= factor) {
      return { /*color: '#ff9966'*/ color: '#000', fontWeight: 'bold' , backgroundColor: '#f4c7c3' }; // light red
    }
    else return null;
  }
  
  function setPointCellStyle(params, factor) {
    let val = params.value;
    if(val >= factor * 5) {
      return { /*color: 'red'*/ color: '#000', fontWeight: 'bold', backgroundColor: 'red'};
    }
    else if(val >= factor * 3 && val < factor * 5) {
      return { /*color: '#ff9966'*/ color: '#000', fontWeight: 'bold', backgroundColor: '#f4c7c3'}; // light red
    }
    else if(val >= factor && val < factor * 3) {
      return { /*color: '#ffcc00'*/ color: '#000', fontWeight: 'bold', backgroundColor: '#fce8b2'}; // light yellow
    }
    else if(val >= 0 && val < factor) {
      return { /*color: '#99cc33'*/ color: '#000', fontWeight: 'bold', backgroundColor: '#b7e1cd'}; // light green
    }
    else return null;
  }

  function fromTimeStrToMin(time_str) {
    let res = time_str.split(" 小時 ");
    let hrs = parseInt(res[0]); // hrs
    let min = parseInt(res[1]);
    return (hrs * 60 + min);
  }

	function numberFormatter(params) {
		// this puts commas into the number eg 1000 goes to 1,000,
		// i pulled this from stack overflow, i have no idea how it works
		return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function getTop10Data(data) {
		let result = [];
		if(data.topUsers) {
			let top10 = data.topUsers;
			for (var i = 0; i < top10.length; i++) {
				result.push({
					rank: top10[i].rank,
					name: top10[i].name,
					rankLevel: top10[i].rankLevel,
					introduction: top10[i].introduction,
					userId: top10[i].userId,
					point: top10[i].point,
					userDeck: top10[i].userDeck, // deck of this top player.
					bonus: 0, // need to implement
					diff_1st: (i > 0 ? (top10[i].point - top10[0].point) : 0),
					diff_last: (i > 0 ? (top10[i].point - top10[i - 1].point) : 0),
					diff_last_round: (i > 0 ? Math.ceil((top10[i - 1].point - top10[i].point) / roundMaxPt)*-1 : 0),
					catch_time: secondsToHrsAndMins(i > 0 ? Math.ceil((top10[i - 1].point - top10[i].point) / roundMaxPt * fastestRound) : 0),
					point_per_hour: (top10[i].point / ((eventProgressed - maintainenceHr * 3600) > 0 ? (eventProgressed - maintainenceHr * 3600) / 3600 : (eventProgressed / 3600))),
					round_per_hour: (top10[i].point / ((eventProgressed - maintainenceHr * 3600) > 0 ? (eventProgressed - maintainenceHr * 3600) / 3600 : (eventProgressed / 3600)) / roundMaxPt).toFixed(2),
					point_10mins: getPointDiffInPeriod(top10[i].userId, 10),
					point_30mins: getPointDiffInPeriod(top10[i].userId, 30),
					point_60mins: getPointDiffInPeriod(top10[i].userId, 60),
					rest: 0, // need to change
          playerId: top10[i].userId,
          valid_round: getActualRoundWithId(top10[i].userId),
					speed_in_theory: (getPointDiffInPeriod(top10[i].userId, 60) / roundMaxPt).toFixed(2),
					comment: getSpeedComment((getPointDiffInPeriod(top10[i].userId, 60) / roundMaxPt), getActualRoundWithId(top10[i].userId))
				});
			}
		}
		return result;
	}

	const getSpeedComment = (speed, standard) => {
		var performance = speed / standard;
		var rank = (performance >= 0.95) ? 'S+':
				(performance >= 0.925) ? 'S':
				(performance >= 0.9) ? 'A+':
				(performance >= 0.875) ? 'A':
				(performance >= 0.85) ? 'B+':
				(performance >= 0.825) ? 'B':
				(performance >= 0.8) ? 'C+':
				(performance >= 0.775) ? 'C':
				(performance >= 0.75) ? 'D+':
				(performance >= 0.725) ? 'D':
				'†┏┛墓┗┓†'
		return rank;
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
		if(timestamp1 >= timestamp2) {
			result = timestamp1 - timestamp2;
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
	}

	async function getAllRecord() {
		let response = await fetch("https://cronpublic.yasushi.me/record.json");
		let data = await response.json();
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

  function getActualRoundWithId(userId) {
    let res = [];
    res = getSpecificIdRecord(rowRecord, userId);
    return new Set(res).size - 1;
  }
  
  function getPointDiffInPeriod(userId, minutes) {
    let res = 0, latest_pt = 0, past_target_pt = 0, rec = [];
    // Unable to get difference more than 60 minutes.
    if(minutes > rowRecord.length && minutes > 60) {
		  return res;
	  } 
	  else {
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
  }

	function updateAllData() {
    // This is an async function
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

	
  const onChangeDarkMode = (e) => {
		setDarkMode(e.target.checked);
		setColumnDefs([
			{ headerName: "Top", field: "rank", sortable: true, filter: "agNumberColumnFilter", maxWidth: 80 },
			{ headerName: "ID", field: "name", sortable: true, filter: "agTextColumnFilter", minWidth: 130 },
			{ headerName: "イベントpt", field: "point", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 120 },
			{ headerName: "ボーナス", field: "bonus", sortable: true, filter: false, maxWidth: 100 },
			{ headerName: "1位差", field: "diff_1st", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
			{ headerName: "前位差", field: "diff_last", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
			{ headerName: "前位回数差", field: "diff_last_round", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setDiffLastRoundCellStyle(params), maxWidth: 130 },
			{ headerName: "追撃時間", field: "catch_time", sortable: true, filter: false, cellStyle: params => setCatchTimeCellStyle(params, 60), maxWidth: 150 },
			{ headerName: "pt時速", field: "point_per_hour", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "周回時速", field: "round_per_hour", sortable: true, filter: false, maxWidth: 100 },
			{ headerName: "pt/10分", field: "point_10mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt), maxWidth: 100 },
			{ headerName: "pt/30分", field: "point_30mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt * 3), maxWidth: 100 },
			{ headerName: "pt/60分", field: "point_60mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt * 6), maxWidth: 100 },
      { headerName: "休憩(min)", field: "rest", sortable: true, filter: false, maxWidth: 100 },
      //{ headerName: "玩家ID", field: "playerId", sortable: true, filter: false, maxWidth: 120 } 
      { headerName: "有效場次/hr", field: "valid_round", sortable: true, filter: false, maxWidth: 120 },
      { headerName: "瞬間時速", field: "speed_in_theory", sortable: true, filter: false, maxWidth: 100 },
      //{ headerName: "吐槽", field: "comment", sortable: true, filter: false, maxWidth: 100 },
  	]);
  }
	
  useEffect(() => {
		// Call for first time without delay.
		updateAllData();
		const interval = setInterval(() => {
			// Loop from second request.
			updateAllData();
		}, 59000);
		return () => clearInterval(interval);
  }, [updateAllData, rowRecord]);

	return (
		<div>
			<div>
				<h5>
					活動進度: {secondsToHrsAndMins(eventProgressed)} (剩餘: {secondsToHrsAndMins((eventDuration * 60 * 60) - eventProgressed)})
				</h5>
			</div>
			<div>
			<FormControlLabel
				control={
					<Switch
						checked={darkMode}
						onChange={onChangeDarkMode}
						name="dark_mode" 
						color="primary"
					/>
				}
				label="ダークモード"
			/>
			</div>
			<div>
				<ProgressBar 
					variant="custom" 
					animated 
					now={((eventProgressed / getTimeDifference(data.endAt, data.startAt)) * 100.0)} 
					label={`${((eventProgressed / getTimeDifference(data.endAt, data.startAt)) * 100.0).toFixed(2)}%`}
					style={{ backgroundColor: 'inherit' }} 
				/>
			</div>
			<div className="grid">
				<div id="myGrid" className={darkMode?"ag-theme-alpine-dark":"ag-theme-alpine"} 
				style={{ height: "500px", width: "95%" }}>
					<AgGridReact
						columnDefs={columnDefs}
						rowData={getTop10Data(data)}
						onGridReady={onGridReady}
					/>
				</div>
			</div>
			<div>
				<h6>最終更新日時: {formattedTimestamp}</h6>
			</div>
		</div>
	);
}