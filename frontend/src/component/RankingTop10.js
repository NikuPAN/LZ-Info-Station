import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import EventProgress from './EventProgress';
import DarkModeBtn from './DarkModeBtn';
import { useTranslation } from 'react-i18next';

export default function RankingTop10({data, trackData, eventStartTimestamp, eventDuration, maintainenceHr}) {

	const [rowRecord, setRowRecord] = useState([[]]);
	const [gridApi, setGridApi] = useState(null);
	const [darkMode, setDarkMode] = useState(true);
	const [columnDefs, setColumnDefs] = useState([]);
	const [roundMaxPt, setRoundMaxPt] = useState(7350);
	const [fastestRound, setFastestRound] = useState(130);

	// Translation
	const { t } = useTranslation();

	var formattedTimestamp = timestampToDateTime(data.lastModified);
	var eventProgressed = getTimeDifference(data.lastModified, eventStartTimestamp);
	var colDef = [
		{ headerName: "#", field: "rank", sortable: false, filter: false, maxWidth: 55 },
		{ headerName: "ID", field: "name", sortable: true, filter: "agTextColumnFilter", cellStyle: params => setNameCellStyle(params), minWidth: 120 },
		{ headerName: `${t('EVENT_PT')}`, field: "point", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
		{ headerName: `${t('EVENT_BONUS')}`, field: "bonus", sortable: true, filter: false, maxWidth: 100 },
		{ headerName: `${t('1ST_DIFF')}`, field: "diff_1st", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
		{ headerName: `${t('FRONT_DIFF')}`, field: "diff_last", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 110 },
		{ headerName: `${t('RND_DIFF')}`, field: "diff_last_round", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setDiffLastRoundCellStyle(params), maxWidth: 100 },
		{ headerName: `${t('CATCH_TIME')}`, field: "catch_time", sortable: true, filter: false, cellStyle: params => setCatchTimeCellStyle(params, 60), maxWidth: 140 },
		{ headerName: `${t('PT_PER_HOUR')}`, field: "point_per_hour", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 95 },
		{ headerName: `${t('AVG_RND_PER_HOUR')}`, field: "round_per_hour", sortable: true, filter: false, maxWidth: 105 },
		{ headerName: `${t('PT_10MINS')}`, field: "point_10mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt), maxWidth: 90 },
		{ headerName: `${t('PT_30MINS')}`, field: "point_30mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt * 3), maxWidth: 90 },
		{ headerName: `${t('PT_60MINS')}`, field: "point_60mins", sortable: true, filter: false, valueFormatter: numberFormatter, cellStyle: params => setPointCellStyle(params, roundMaxPt * 6), maxWidth: 90 },
		{ headerName: `${t('REST')}`, field: "rest", sortable: true, filter: false, maxWidth: 100 },
		// { headerName: `${t('PLAYER_NAME')}`, field: "playerId", sortable: true, filter: false, maxWidth: 120 } 
		{ headerName: `${t('INSTANT_RND_PER_HOUR')}`, field: "valid_round", sortable: true, filter: false, maxWidth: 105 },
		{ headerName: `${t('INSTANT_RND_IN_MAX_PT')}`, field: "speed_in_theory", sortable: true, filter: false, maxWidth: 100 },
		{ headerName: `${t('GRADE')}`, field: "comment", sortable: true, filter: false, maxWidth: 120 }
	];
	
  function onGridReady(params) {
		setGridApi(params.api);
		setColumnDefs(colDef);
	}
 
	function setNameCellStyle(params) {
		return  { color: '#8888ff', fontWeight: 'bold' };
	}

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
    return null;
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
    return null;
  }
  
  function setPointCellStyle(params, factor) {
		let val = params.value;
		if(factor === 0) // return null if round max pt is not passed in
			return null;
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
    return null;
  }

  function fromTimeStrToMin(time_str) {
    let res = time_str.split(` ${t('HOUR')} `);
    let hrs = parseInt(res[0]); // hrs
    let min = parseInt(res[1]);
    return (hrs * 60 + min);
  }

	function numberFormatter(params) {
		// this puts commas into the number eg 1000 goes to 1,000,
		// I pulled this from stack overflow, i have no idea how it works
		return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function changeName(originName, id) {
		let name = originName;
		for (let i = 0; i < trackData.length; i++) {
			if(parseInt(id) === trackData[i].gameId) {
				name = trackData[i].name;
				break;
			}
		}
		return name;
	}

	function getTop10Data(data) {
		let result = [];
		if(data.topUsers) {
			let top10 = data.topUsers;
			for (var i = 0; i < top10.length; i++) {
				result.push({
					rank: top10[i].rank,
					name: changeName(top10[i].name, top10[i].userId),
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
		var rank = (performance >= 0.95) ? 'SS':
				(performance >= 0.925) ? 'S':
				(performance >= 0.9) ? 'A+':
				(performance >= 0.875) ? 'A':
				(performance >= 0.85) ? 'B+':
				(performance >= 0.825) ? 'B':
				(performance >= 0.8) ? 'C+':
				(performance >= 0.775) ? 'C':
				(performance >= 0.75) ? 'D':
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
		return (hours+` ${t('HOUR')} `+mins+` ${t('MINUTE')}`);
	}

	function getAllRecord() {
		let data = fetch("https://cronpublic.yasushi.me/record.json")
		.then(response => response.json())
		return data;
	}

	function updateRoundMaxPt() {
		if(rowRecord === [[]])
			return;
		let maxPt = 0;
		for(let i = 0; i < rowRecord.length - 1; i++) {
			for(let j = 0; j < rowRecord[i].length; j++) {
				if(rowRecord[i][j].userId === rowRecord[i + 1][j].userId) {
					let newMax = (rowRecord[i][j].point - rowRecord[i + 1][j].point);
					if(maxPt < newMax)
						maxPt = newMax;
				}
			}
		}
		setRoundMaxPt(maxPt);
		console.log("Round max pt: "+roundMaxPt);
		// return maxPt;
	}

  function getSpecificIdRecord(array, userId) {
    let res = [];
    if(!array || array.length === 0)
      return null;
    for(let i = 0; i < array.length; i++) {
      for(let j = 0; j < array[i].length; j++) {
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

	const updateAllData = () => {
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
		.then(records => setRowRecord(records))
	}

	const onChangeLanguage = () => {
		setColumnDefs(colDef);
	} 
	
  const onChangeDarkMode = (e) => {
		setDarkMode(e.target.checked);
		setColumnDefs(colDef);
  }

  useEffect(() => {
		// Call for first time without delay.
		updateAllData();
		// updateRoundMaxPt();
		const interval = setInterval(() => {
			// Loop from second request.
			updateAllData();
		}, 59000);
		return () => clearInterval(interval);
  }, []); /**, [rowRecord] dependencies array */

	return (
		<div>
			<div className="eventdetail left2">
				<h5>
					{t('MAX_PT')}: <b>{roundMaxPt}</b>、{t('FASTEST_RND')}: <b>{fastestRound} 秒</b><br/>
					{t('EVENT_PROGRESS')}: <b>{secondsToHrsAndMins(eventProgressed)}</b> ({t('EVENT_TIME_LEFT')}: <b>{secondsToHrsAndMins((eventDuration * 60 * 60) - eventProgressed)}</b>)
				</h5>
			</div>
			<div className="eventdetail right2">
				<DarkModeBtn 
					checked={darkMode}
					onChange={onChangeDarkMode}
				/>
			</div>
			<div>
				<EventProgress 
					now={((eventProgressed / getTimeDifference(data.endAt, data.startAt)) * 100.0)}
					label={`${((eventProgressed / getTimeDifference(data.endAt, data.startAt)) * 100.0).toFixed(1)}%`}
				/>
			</div>
			<div className="grid">
				<div 
					id="myGrid" 
					className={darkMode?"ag-theme-alpine-dark":"ag-theme-alpine"} 
					style={{ height: "500px", width: "95%" }}
				>
					<AgGridReact
						columnDefs={columnDefs}
						rowData={getTop10Data(data)}
						onGridReady={onGridReady}
						onRowClicked={null}
					/>
				</div>

			</div>
			<div>
				<h6>{t('LAST_UPDATE')}: {formattedTimestamp}</h6>
			</div>
		</div>
	);
}