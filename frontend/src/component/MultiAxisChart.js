import React, { Component } from 'react'
import CanvasJSReact from './assets/canvasjs.react';
// import { Trans, withTranslation } from 'react-i18next';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var datapoints1 = [];
var datapoints2 = [];
var datapoints3 = [];

class MultiAxisChart extends Component {

  constructor(props) {
		super(props);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
    this.updateChart = this.updateChart.bind(this);
	}

  componentDidMount = () => {
    this.updateChart();
    // console.log(this.props.roundMaxPt);
    // console.log(this.props.pointsPerHour);
    // console.log(this.props.roundPerHour);
    // console.log(this.props.speedTheoryPerHour);
    // console.log("Mount");
  }

  componentDidUpdate = () => {
    // console.log("Update");
    // console.log(this.props.roundMaxPt);
    this.updateChart();
  }

  updateChart = () => {
    // Reset Arrays.
    datapoints1.length = 0;
    datapoints2.length = 0;
    datapoints3.length = 0;
    for(var i = 0; i < 10; i++) {
      datapoints1.push({
        x: i+1,
        y: this.props.pointsPerHour[i]
      });
      datapoints2.push({
        x: i+1,
        y: this.props.roundPerHour[i]
      });
      datapoints3.push({
        x: i+1,
        y: parseFloat(this.props.speedTheoryPerHour[i])
      });
    }
    this.chart.render();
  }

  toggleDataSeries = (e) => {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

  render() {

    const options = {
      theme: "dark2",
      animationEnabled: true,
      title: {
        text: "TOP10 イベPT vs 回数 vs 理論時速/hr"
      },
      subtitles: [{
        text: "アイコンを押してデータが表示/非表示替える"
      }],
      axisX: {
        title: "TOP #",
        interval: 1,
        valueFormatString: "TOP #"
      },
      axisY: {
        title: "イベントPT",
        titleFontColor: "#51CDA0",
        lineColor: "#51CDA0",
        labelFontColor: "#51CDA0",
        tickColor: "#51CDA0"
      },
      axisY2: [{
        title: "回数",
        titleFontColor: "#6D78AD",
        lineColor: "#6D78AD",
        labelFontColor: "#6D78AD",
        tickColor: "#6D78AD"
      },
      {
        title: "理論時速",
        titleFontColor: "#C24642",
        lineColor: "#C24642",
        labelFontColor: "#C24642",
        tickColor: "#C24642"
      }],
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [{
        type: "spline",
        name: "イベントPT/hr",
        color: "#51CDA0",
        showInLegend: true,
        yValueFormatString: "#,##0.#",
        dataPoints: datapoints1
      },
      {
        type: "spline",
        name: "回数/hr",
        axisYIndex: 0,
        axisYType: "secondary",
        color: "#6D78AD",
        showInLegend: true,
        yValueFormatString: "#,##0",
        dataPoints: datapoints2
      },
      {
        type: "spline",
        name: "理論時速/hr",
        axisYIndex: 1,
        axisYType: "secondary",
        color: "#C24642",
        showInLegend: true,
        yValueFormatString: "#,##0.##",
        dataPoints: datapoints3
      }]
    }

    return (
      <div>
        <CanvasJSChart options = {options} 
           onRef={ref => this.chart = ref}
        />
      </div>
    )
  }
}

export default MultiAxisChart;
