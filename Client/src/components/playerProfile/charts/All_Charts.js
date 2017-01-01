
/*
  Pass an chart config obj for all variables
  {
    type: string,
    id: string,
    data: {
      labels: array,
      datasets: [{
        label: string,
        data: array based on chart,
        backgroundColor: array of rgba colors,
        borderWidth: int,
      }]
    },
    options: {
      onClick: function(),
      events: ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"],
      responsive: bool,
      title: {
        display: bool,
        text: string
      },
      legend: {
        display: bool
        position: 'top','left','bottom','right'
      }
    }
  }

  /*
  {
      labels: stats.map((s) => s.seasonId),
      datasets: [{
          label: 'Regular Season Points',
          data: stats.map((s) => s.pts),
          backgroundColor: colors,
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
  }*/

export function GenericChart(chartObj) {
  var myChart = new Chart(document.getElementById(chartObj.id), {
    type: chartObj.type,
    data: chartObj.data,
    options: chartObj.options
  });

  return myChart;
}
