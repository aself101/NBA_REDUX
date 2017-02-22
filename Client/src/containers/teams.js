import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchTeamDataServer } from '../actions';
import Team from '../components/team';

class Teams extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.teams) return <span></span>;

    return (
      <div>
        <div className="teams">
          {
            this.props.teams.map((team) => (
              <Team key={team.teamId} team={team} fetchTeam={this.props.fetchTeamData} />
            ))
          }
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTeamData: fetchTeamDataServer
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
    team: state.team
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
