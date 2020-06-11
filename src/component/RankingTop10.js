import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

export default function RankingTop10() {

	const [rawData, setRawData] = useState([]);
	//const [rowData, setRowData] = useState([]);
	const [gridApi, setGridApi] = useState(null);

	const [columnDefs, setColumnDefs] = useState([
			{ headerName: "Top", field: "rank", sortable: true, filter: "agNumberColumnFilter", maxWidth: 80 },
			{ headerName: "ID", field: "name", sortable: true, filter: "agTextColumnFilter", minWidth: 150 },
			{ headerName: "イベントpt", field: "point", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 130 },
			{ headerName: "ボーナス", field: "bonus", sortable: true, filter: false, maxWidth: 120 },
			{ headerName: "1位差", field: "diff_1st", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "前位差", field: "diff_last", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 100 },
			{ headerName: "前位回数差", field: "diff_last_round", sortable: true, filter: false, valueFormatter: numberFormatter, maxWidth: 150 },
			{ headerName: "追撃時間", field: "catch_time", sortable: true, filter: false, maxWidth: 150 },
			{ headerName: "pt時速", field: "point_per_hour", sortable: true, filter: false, maxWidth: 100 },
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
		console.log("getTop10 called");
		console.log(data);
		let result = [];
		if(data.topUsers) {
			let top10 = data.topUsers;
			console.log(top10.length);
			for (var i = 0; i < top10.length; i++) {
				result.push({
					rank: top10[i].rank,
					name: top10[i].name,
					rankLevel: top10[i].rankLevel,
					introduction: top10[i].introduction,
					userId: top10[i].userId,
					point: top10[i].point,
					userDeck: top10[i].userDeck,
					bonus: 0,
					diff_1st: (i > 0 ? (top10[0].point - top10[i].point) : 0),
					diff_last: (i > 0 ? (top10[i - 1].point - top10[i].point) : 0),
					diff_last_round: 0, // Need to change
					catch_time: 0, // need to change
					point_per_hour: 0, // need to change
					round_per_hour: 0, // need to change
					point_10mins: 0, // need to change
					point_30mins: 0, // need to change
					point_60mins: 0, // need to change
					rest: 0,
					playerId: top10[i].userId
				});
			}
		}
		return result;
	}

	async function getAllData() {
		let response = await fetch("https://cronpublic.yasushi.me/ranking.json");
		let data = await response.json();
		console.log(data);
		return data;
	}

    useEffect(() => {
			// This is an async function.
			getAllData()
			//.then(res => console.log(res));
			// .then(
			// 	(res) => {
			// 		setRawData({
			// 			lastModified: res.lastModified,
			// 			topUsers: res.topUsers
			// 		});
			// 	}
			// );
			.then(res => {
				return {
						lastModified: res.lastModified,
						topUsers: res.topUsers
				};
			})
			.then(ranks => setRawData(ranks));
	}, []);

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

	var gridData = getTop10Data(rawData);
	var formattedTimestamp = timestampToDateTime(rawData.lastModified);

	return (
		<div>
			<div>
				<h4>最終更新日時: {formattedTimestamp}</h4>
			</div>
			<div class="container">
				
				<div id="myGrid" className="ag-theme-alpine-dark" 
				style={{ height: "540px", width: "95%" }}>
					<AgGridReact
						columnDefs={columnDefs}
						rowData={gridData}
						onGridReady={onGridReady}
						// onRowClicked={}
						pagination={true}
						paginationPageSize={10}
					/>
				</div>
			</div>
		</div>
	);
}