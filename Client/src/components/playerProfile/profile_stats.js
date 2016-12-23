import React, { Component } from 'react';

import StatsTable from './profile_stats_table';

export default class ProfileStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: {
        pts: '',
        ast: '',
        reb: '',
        stl: '',
        blk: '',
        tov: '',
        min: '',
        fgPct: '',
        fg3Pct: '',
        ftPct: ''
      }
    };
    this.filterStats = this.filterStats.bind(this);
  }
  filterStats(e) {
    const _season = e.currentTarget.id;

    var selectedSeason = this.props.playerStats.seasonTotalsRegularSeason.filter((season) => {
      return _season === season.seasonId
    });
    this.setState({season: selectedSeason[0]});

  }
  render() {

    return (
      <div>
        <div className="row">
          <div className="col-sm-3 col-md-2">
            <ul className="list-group">
              {
                this.props.playerStats.seasonTotalsRegularSeason.map((season) => (
                  <li key={`${season.seasonId}${season.teamAbbreviation}`}
                    className="list-group-item"
                    onClick={this.filterStats}
                    id={season.seasonId}
                  >
                    {season.seasonId} {season.teamAbbreviation}
                  </li>
                ))
              }
              <li className="list-group-item">Career</li>
            </ul>
          </div>
          <div className="col-sm-9 col-md-10">
            <StatsTable stats={this.state.season} />
          </div>
        </div>
      </div>
    );
  }
};























/* END */
