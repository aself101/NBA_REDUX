import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBoxScoresServer } from '../actions';

import Boxscore from '../components/boxscore';

class BoxScores extends Component {
  constructor(props) {
    super(props);
    this.mapBoxScores = this.mapBoxScores.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    $('#gameDate input').datepicker();
  }
  mapBoxScores() {
    return this.props.boxscores.map(({team1, team2}) => {
      return (
          <Boxscore key={`${team1.gameId}`}
          team1={team1}
          team2={team2}
        />
      );
    });
  }
  fetch() {
    var date = document.getElementById('gameDate').value
      .split('/')
      .join('-');
    if (!date) return;
    return this.props.fetchBoxScores(date);
  }
  render() {
    var length;
    if (!this.props.boxscores) length = [];
    else {
      length = this.props.boxscores.length;
    }
    return (
      <div>
        <h1 className="page-header">Box Scores</h1>
        <div className="form-inline">
          <input className="form-control" id="gameDate" data-provide="datepicker" />
          <button className="btn btn-default" onClick={() => this.fetch()}>Get Games</button>
        </div>
        <div className="scores">
          { length > 0 ? this.mapBoxScores() : '' }
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    boxscores: state.boxscores.scores,
    date: state.boxscores.date
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBoxScores: fetchBoxScoresServer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxScores);












































/* END */
