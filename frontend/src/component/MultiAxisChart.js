import React, { Component } from 'react'
import CanvasJSReact from './assets/canvasjs.react';
// import { Trans, withTranslation } from 'react-i18next';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultiAxisChart extends Component {

  constructor(props) {
		super(props);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
    // console.log(props.data);
    this.state = {
      datapoints_Y: [
        { x: 1, y: 120 },
        { x: 2, y: 135 },
        { x: 3, y: 144 },
        { x: 4, y: 103 },
        { x: 5, y: 93 },
        { x: 6, y: 129 },
        { x: 7, y: 143 },
        { x: 8, y: 156 },
        { x: 9, y: 122 },
        { x: 10, y: 106 }
      ],
      datapoints_Y2: [
        { x: 1, y: 19034.5 },
        { x: 2, y: 20015 },
        { x: 3, y: 27342 },
        { x: 4, y: 20088 },
        { x: 5, y: 20234 },
        { x: 6, y: 29034 },
        { x: 7, y: 30487 },
        { x: 8, y: 32523 },
        { x: 9, y: 20234 },
        { x: 10, y: 27234 }
      ]
    }
	}

  componentDidMount = () => {
    console.log(this.props.data);
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
        text: "TOP10 イベントPT vs 回数/hr"
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
        title: "回数/hr",
        titleFontColor: "#6D78AD",
        lineColor: "#6D78AD",
        labelFontColor: "#6D78AD",
        tickColor: "#6D78AD"
      },
      axisY2: {
        title: "イベントPT",
        titleFontColor: "#51CDA0",
        lineColor: "#51CDA0",
        labelFontColor: "#51CDA0",
        tickColor: "#51CDA0"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [{
        type: "spline",
        name: "回数/hr",
        showInLegend: true,
        yValueFormatString: "#,##0 Round",
        dataPoints: this.state.datapoints_Y
      },
      {
        type: "spline",
        name: "イベントPT",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "$#,##0.#",
        dataPoints: this.state.datapoints_Y2
      }]
    }

    return (
      <div>
        {/* <h1>Multi-axis chart</h1><br/>
        <h1>Multi-axis chart</h1><br/>
        <h1>Multi-axis chart</h1> */}
        <CanvasJSChart options = {options} 
           onRef={ref => this.chart = ref}
        />
      </div>
    )
  }
}

export default MultiAxisChart;
