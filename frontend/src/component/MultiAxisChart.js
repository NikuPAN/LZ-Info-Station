import React, { Component } from 'react'
import CanvasJSReact from './assets/canvasjs.react';
// import { Trans, withTranslation } from 'react-i18next';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultiAxisChart extends Component {

  constructor(props) {
		super(props);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
    this.state = {
      datapoints_Y: this.assignDatapoints(props.roundPerHour),
      datapoints_Y2: this.assignDatapoints(props.pointsPerHour)
    }
	}

  assignDatapoints = (datapoints = []) => {
    let datapts = [];
    datapoints.map((datapoint, i) => {
      datapts.push({ x: i + 1, y: datapoint });
    });
    return datapts;
  }

  componentDidMount = () => {
    // console.log(this.props.roundMaxPt);
    // console.log(this.props.pointsPerHour);
    // console.log(this.props.roundPerHour);
  }

  componentDidUpdate = () => {
    // console.log(this.props.roundMaxPt);
    // console.log(this.props.pointsPerHour);
    // console.log(this.props.roundPerHour);
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
        yValueFormatString: "#,##0",
        dataPoints: this.state.datapoints_Y
      },
      {
        type: "spline",
        name: "イベントPT/hr",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0.#",
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
