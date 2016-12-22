import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { fetchPlayers, fetchTeams, fetchStandingsServer } from '../actions';

/* Redux Containers */
import BoxScores from './boxscores';
import Header from './header';
import Players from './players';
import Teams from './teams';
/* Simple components */
import Standings from '../components/standings';
import PlayerTable from '../components/player_table';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    $(document.body).css("padding-top", "50px");
    this.props.fetchPlayers();
  }
  componentDidMount() {
    this.props.fetchTeams();
    this.props.fetchStandings();
  }
  render() {
    if (!this.props.players) return <span></span>;

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li role="presentation" className="active"><a href="#boxscores" aria-controls="boxscores" role="tab" data-toggle="tab">Box Scores</a></li>
                <li role="presentation"><a href="#standings" aria-controls="standings" role="tab" data-toggle="tab">Standings</a></li>
                <li role="presentation"><a href="#players" aria-controls="players" role="tab" data-toggle="tab">Players</a></li>
                <li role="presentation"><a href="#teams" aria-controls="teams" role="tab" data-toggle="tab">Teams</a></li>
                <li role="presentation"><a href="#shots" aria-controls="shots" role="tab" data-toggle="tab">Shots</a></li>
                <li role="presentation"><a href="#newsFeed" aria-controls="newsFeed" role="tab" data-toggle="tab">News & Feeds</a></li>
                <li role="presentation"><a href="#videos" aria-controls="videos" role="tab" data-toggle="tab">Videos</a></li>
                <li role="presentation"><a href="#analytics" aria-controls="analytics" role="tab" data-toggle="tab">Analytics</a></li>
              </ul>
            </div>
            <div className="tab-content col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
              <div role="tabpanel" className="tab-pane active" id="boxscores">
                <BoxScores />
              </div>
              <div role="tabpanel" className="tab-pane" id="standings">
                <Standings standings={this.props.standings} />
              </div>
              <div role="tabpanel" className="tab-pane" id="players">
                <Players />
              </div>
              <div role="tabpanel" className="tab-pane" id="teams">
                <h1 className="page-header">Teams</h1>
                <Teams />
              </div>
              <div role="tabpanel" className="tab-pane" id="shots">
                <h1 className="page-header">Shots</h1>

              </div>
              <div role="tabpanel" className="tab-pane" id="newsFeed">
                <h1 className="page-header">News & Feeds</h1>

              </div>
              <div role="tabpanel" className="tab-pane" id="videos">
                <h1 className="page-header">Videos & Highlights</h1>

              </div>
              <div role="tabpanel" className="tab-pane" id="analytics">
                <h1 className="page-header">Analytics</h1>

              </div>
              <div role="tabpanel" className="tab-pane" id="blog">
                <h1 className="page-header">Blog</h1>

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    players: state.players,
    standings: state.standings,
    teams: state.teams
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPlayers,
    fetchTeams,
    fetchStandings: fetchStandingsServer
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);



/* END */
