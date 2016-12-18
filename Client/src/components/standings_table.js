import React from 'react';

function calcPercent(pct) {
  return Math.floor(pct * 100);
}

const StandingsTable = ({standing}) => {
  return (
    <table className="table table-responsive table-hover table-bordered">
      <thead>
        <tr>
          <th>Team</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Win %</th>
          <th>Home</th>
          <th>Away</th>
          <th>Games Played</th>
        </tr>
      </thead>
      <tbody>
        {
          standing.map((team) => (
            <tr key={team.teamId}>
              <td><b>{team.team}</b></td>
              <td>{team.w}</td>
              <td>{team.l}</td>
              <td>{calcPercent(team.wPct)}%</td>
              <td>{team.homeRecord}</td>
              <td>{team.roadRecord}</td>
              <td>{team.g}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default StandingsTable;
