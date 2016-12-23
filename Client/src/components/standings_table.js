import React from 'react';

import { TEAM_IMG_URL } from '../actions';

function calcPercent(pct) {
  return Math.floor(pct * 100);
}

const StandingsTable = ({standings}) => {
  if (!standings) return <span></span>;
  return (
    <table className="table table-responsive table-hover table-bordered">
      <thead>
        <tr>
          <th>TEAM</th>
          <th>W</th>
          <th>L</th>
          <th>PCT</th>
          <th>GB</th>
          <th>HOME</th>
          <th>ROAD</th>
          <th>CONF</th>
          <th>DIV</th>
          <th>STRK</th>
          <th>L10</th>
        </tr>
      </thead>
      <tbody>
        {
          standings.map((team, index) => {
            var isWinStreak = team.isWinStreak;
            var streak;
            // Output ranking 1- 8
            var rank = index + 1;
            if (rank > 8) rank = '';
            if (isWinStreak) streak = `W${team.streak}`;
            else streak = `L${team.streak}`;
            return (
              <tr key={team.teamId}>
                <td>
                  <b>{ rank }</b>{"\u00a0"}
                  <img src={`${TEAM_IMG_URL}/${team.abbreviation}.svg`}
                    height="36" width="36"
                  />
                  <b>{team.teamName}</b>
                </td>
                <td>{team.win}</td>
                <td>{team.loss}</td>
                <td>{team.winPctV2}%</td>
                <td>{team.gamesBehind}</td>
                <td>{team.homeWin} - {team.homeLoss}</td>
                <td>{team.awayWin} - {team.awayLoss}</td>
                <td>{team.confWin} - {team.confLoss}</td>
                <td>{team.divWin} - {team.divLoss}</td>
                <td>{ streak }</td>
                <td>{team.lastTenWin} - {team.lastTenLoss}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default StandingsTable;
