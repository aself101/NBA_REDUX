import React, { Component } from 'react';
import { GenericChart } from './charts/All_Charts.js';


export default class SeasonChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 50,
      padding: 30,
      data: this.props.playerStats,
      id: this.props.id,
      curChart: null
    };
    this.renderChart = this.renderChart.bind(this);
  }
  componentDidMount() {
    this.renderChart(this.state.data);
  }
  componentWillReceiveProps(nextProps) {
    this.renderChart(nextProps.playerStats);
  }
  renderChart(props) {
    if (!props) return;
    if (this.state.curChart) this.state.curChart.destroy();

    var myChart = new Chart(document.getElementById(this.props.id), {
      type: this.props.type,
      data: {
          labels: props.seasonTotalsRegularSeason.map((s) => s.seasonId),
          datasets: [{
              label: this.props.label,
              data: props.seasonTotalsRegularSeason.map(this.props.stat),
              backgroundColor: this.props.colors,
              borderColor: 'rgba(255, 206, 86, 0.2)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
          responsive: true,
          maintainAspectRatio: true
      }
    });
    this.setState({curChart: myChart});
  }
  render() {
    return (
      <div>
        <canvas className={"all-charts"} id={this.props.id} width={this.state.width} height={this.state.height}></canvas>
      </div>
    );
  }
}
