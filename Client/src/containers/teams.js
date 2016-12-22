import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Team from '../components/team';

class Teams extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.teams) return <span></span>;

    return (
      <div className="teams">
        {
          this.props.teams.map((team) => (
            <Team key={team.teamId} team={team} />
          ))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams
  }
}

export default connect(mapStateToProps)(Teams);
