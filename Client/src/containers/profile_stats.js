import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRegSeasonPlayerStats, fetchCareerRegSeasonPlayerStats } from '../actions';
import StatsTable from '../components/playerProfile/profile_stats_table';


class ProfileStats extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.playerStats) return <span></span>;
    return (
      <div>
        <div className="row">
          <div className="col-sm-3 col-md-2">
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Regular Season <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                {
                  this.props.playerStats.seasonTotalsRegularSeason.map((season) => {
                    if (season.teamAbbreviation === 'TOT') return;
                    return (
                      <li key={`${season.seasonId}${season.teamAbbreviation}`}
                        className="list-group-item player-season-stats"
                        onClick={(e) => this.props.fetchRegSeasonPlayerStats(e)}
                        id={season.seasonId}>
                        {season.seasonId} {season.teamAbbreviation}
                      </li>
                    )
                  })
                }
                <li className="list-group-item player-season-stats"
                  onClick={this.props.fetchCareerRegSeasonPlayerStats}>
                  Career
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-9 col-md-10">
            <StatsTable stats={this.props.regSeasonSelected} season={'Regular Season'} />
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    playerStats: state.player.playerStats,
    playerInfo: state.player.playerInfo,
    regSeasonSelected: state.player.regSeasonSelected,
    postSeasonSelected: state.player.postSeasonSelected,
    preSeasonSelected: state.player.preSeasonSelected
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRegSeasonPlayerStats: fetchRegSeasonPlayerStats,
    fetchCareerRegSeasonPlayerStats
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileStats);





















/* END */
