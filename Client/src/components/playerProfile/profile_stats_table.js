import React from 'react';

import { TEAM_IMG_URL } from '../../actions';

function calcPercent(pct) {
  return Math.floor(pct * 100);
}

const StatsTable = ({stats}) => {
  var defaultImg = 'img/nba-log.png';
  if (stats) defaultImg = `${TEAM_IMG_URL}/${stats.teamAbbreviation}.svg`;
  return (
    <div>
      <div className="well">
        <img src={defaultImg}
          height="50" width="50"
        />
        <h4 className="boxscores-right">{stats.seasonId}</h4>
      </div>
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>PTS</th>
            <th>AST</th>
            <th>REB</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TOV</th>
            <th>MIN</th>
            <th>FG%</th>
            <th>FG3%</th>
            <th>FT%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stats.pts}</td>
            <td>{stats.ast}</td>
            <td>{stats.reb}</td>
            <td>{stats.stl}</td>
            <td>{stats.blk}</td>
            <td>{stats.tov}</td>
            <td>{stats.min}</td>
            <td>{calcPercent(stats.fgPct)}%</td>
            <td>{calcPercent(stats.fg3Pct)}%</td>
            <td>{calcPercent(stats.ftPct)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
