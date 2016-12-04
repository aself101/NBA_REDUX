import React from 'react';

export default function({team}) {
  return (
    <table className="table table-responsive table-condensed">
      <thead>
        <tr>
          <th>{team.teamAbbreviation}</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>Assists</b></td>
          <td>{team.ast}</td>
        </tr>
        <tr>
          <td><b>Rebounds</b></td>
          <td>{team.reb}</td>
        </tr>
        <tr>
          <td><b>TOV</b></td>
          <td>{team.tov}</td>
        </tr>
        <tr>
          <td><b>3PFG%</b></td>
          <td>{Math.floor(team.fg3Pct*100)}%</td>
        </tr>
        <tr>
          <td><b>FG%</b></td>
          <td>{Math.floor(team.fgPct*100)}%</td>
        </tr>
        <tr>
          <td><b>FT%</b></td>
          <td>{Math.floor(team.ftPct*100)}%</td>
        </tr>
      </tbody>
    </table>
  );
}
