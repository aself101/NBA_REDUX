import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBoxScoresServer } from '../actions';

import Boxscore from '../components/boxscores/boxscore';

class BoxScores extends Component {
  constructor(props) {
    super(props);
    this.mapBoxScores = this.mapBoxScores.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    $('#gameDate input').datepicker();
    var today = new Date();
    today = today.toLocaleDateString().split('/').join('-');
    this.props.fetchBoxScores(today);
  }
  mapBoxScores() {
    return this.props.boxscores.map(({team1, team2}, index) => {
      return (
          <Boxscore key={`${team1.gameId}`}
          team1={team1}
          team2={team2}
          gameInfo={this.props.gameInfo[index]}
          lastMeeting={this.props.lastMeeting[index]}
        />
      );
    });
  }
  fetch() {
    if (!document.getElementById('gameDate').value) return;
    return this.props.fetchBoxScores(document.getElementById('gameDate')
      .value.split('/').join('-'));
  }
  render() {
    var length;
    if (!this.props.boxscores) length = [];
    else {
      length = this.props.boxscores.length;
    }
    return (
      <div>
        <h1 className="page-header box-headline">Box Scores <i className="glyphicon glyphicon-flag"></i> { this.props.date }</h1>
        <div className="form-inline">
          <input className="form-control" id="gameDate" data-provide="datepicker" />
          <button className="btn btn-default" onClick={() => this.fetch()}>Get Games</button>
        </div>
        <center><div><i className="fa fa-dribbble loading"></i></div></center>
        <div className="scores">
          { length > 0 ? this.mapBoxScores() : '' }
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    boxscores: state.boxscores.teams,
    date: state.boxscores.date,
    loading: state.boxscores.loading,
    gameInfo: state.boxscores.gameInfo,
    lastMeeting: state.boxscores.lastMeeting
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBoxScores: fetchBoxScoresServer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxScores);












































/* END */
