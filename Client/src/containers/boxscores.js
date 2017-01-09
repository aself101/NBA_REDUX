import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBoxScoresServer, fetchBoxScoresTeamPlayerInfoServer } from '../actions';

import Boxscore from '../components/boxscores/boxscore';
import SmallBoxScore from '../components/boxscores/boxscore_small';
import BoxscoreModal from '../components/boxscores/boxscore_modal';
import { TEAM_IMG_URL } from '../actions';

class BoxScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date().toLocaleDateString().split('/').join('-')
    };
    this.mapBoxScores = this.mapBoxScores.bind(this);
    this.mapSmallBoxScores = this.mapSmallBoxScores.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    $('#gameDate input').datepicker();
    this.props.fetchBoxScores(this.state.today);
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
  mapSmallBoxScores() {
    return this.props.boxscores.map(({team1, team2}, index) => {
      return (
        <div key={team1.gameId}>
          <SmallBoxScore team1={team1} team2={team2}
            gameInfo={this.props.gameInfo[index]}
            fetchBoxScoresTPInfo={this.props.fetchBoxScoresTPInfo}
          />
          <BoxscoreModal team1={team1} team2={team2}
            gameInfo={this.props.gameInfo[index]}
            gameStats={this.props.gameSelected}
          />
        </div>
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
        <hr />
        <center><div><i className="fa fa-dribbble loading"></i></div></center>
        <div className="small-scores">
          { length > 0 ? this.mapSmallBoxScores() : '' }
        </div>
        <div className="scores" id="boxscores">
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
    lastMeeting: state.boxscores.lastMeeting,
    gameSelected: state.boxscores.gameSelected
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBoxScores: fetchBoxScoresServer,
    fetchBoxScoresTPInfo: fetchBoxScoresTeamPlayerInfoServer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxScores);












































/* END */
