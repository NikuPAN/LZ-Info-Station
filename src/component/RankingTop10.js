import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

export default function RankingTop10() {

    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Top", field: "top", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 },
        { headerName: "ID", field: "name", sortable: true, filter: "agTextColumnFilter", maxWidth: 130 },
        { headerName: "イベントpt", field: "eventpt", sortable: true, filter: "agNumberColumnFilter", maxWidth: 130 },
        { headerName: "ボーナス", field: "bonus", sortable: true, filter: "agNumberColumnFilter", maxWidth: 120 },
        { headerName: "1位差", field: "diff_1st", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 },
        { headerName: "前位差", field: "diff_last", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 },
        { headerName: "前位回数差", field: "diff_last_round", sortable: true, filter: "agNumberColumnFilter", maxWidth: 150 },
        { headerName: "追撃時間", field: "catch_time", sortable: true, filter: false, maxWidth: 150 },
        { headerName: "pt時速", field: "point_per_hour", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 },
        { headerName: "平均周回時速", field: "round_per_hour", sortable: true, filter: "agNumberColumnFilter", maxWidth: 150 },
        { headerName: "pt/10分", field: "point_10mins", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 },
        { headerName: "pt/30分", field: "point_30mins", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 },
        { headerName: "pt/60分", field: "point_60mins", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 },
        { headerName: "休憩(min)", field: "rest", sortable: true, filter: "agNumberColumnFilter", maxWidth: 100 }
    ]);

    useEffect(() => {
			fetch("https://cronpublic.yasushi.me/ranking.json")
				.then(res => res.json())
				.then(data =>
					data.map(rank => {
						return {
								timestamp: stock.timestamp,
								date: timestampToDDMMYYYY(stock.timestamp),
								symbol: stock.symbol,
								name: stock.name,
								industry: stock.industry,
								open: stock.open,
								high: stock.high,
								low: stock.low,
								close: stock.close,
								volumes: stock.volumes
						};
					})
				)
				.then(ranks => setRowData(ranks));
	}, [rowData]);

  function onGridReady(params) {
		setGridApi(params.api);
		//console.log(rowData);
	}

	function updateColumn(newColumn) {
		
	}

	return (
		<div>
			<div id="myGrid" className="ag-theme-alpine-dark"
			style={{ height: "500px", width: "100%" }} >
			<AgGridReact
				columnDefs={this.state.columnDefs}
				rowData={this.state.rowData}
				onGridReady={onGridReady}
				// onRowClicked={}
				pagination={true}
				paginationPageSize={10}
			/>
			</div>
		</div>
	);
}