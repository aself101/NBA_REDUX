import React, { Component } from 'react';


export default class SeasonChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 50,
      padding: 30,
      data: this.props.playerStats
    };
    this.renderChart = this.renderChart.bind(this);
  }
  componentDidMount() {
    this.renderChart(this.state.data);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.renderChart(nextProps.playerStats);
    /*this.setState({data: nextProps}, () => {
      console.log('In componentWillReceiveProps');
      console.log(this.state.data);
      this.renderChart(this.state.data);
    });*/
  }
  renderChart(props) {
    var ctx = document.getElementById(this.props.id);
    var myChart = new Chart(ctx, {
      type: this.props.type,
      data: {
          labels: props.seasonTotalsRegularSeason.map((s) => s.seasonId),
          datasets: [{
              label: 'Regular Season Points',
              data: props.seasonTotalsRegularSeason.map((s) => s.pts),
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
          responsive: true
      }
    });
    myChart.update();
  }
  render() {
    return (
      <div>
        <canvas id={this.props.id} width={this.state.width} height={this.state.height}></canvas>
      </div>
    );
  }
}
