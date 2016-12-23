import React from 'react';

export default function BoxscoreTable({team1, team2}) {
  return (
    <table className="table table-responsive table-bordered">
      <thead>
        <tr>
          <th>Team</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{team2.teamAbbreviation}</td>
          <td>{team2.ptsQtr1}</td>
          <td>{team2.ptsQtr2}</td>
          <td>{team2.ptsQtr3}</td>
          <td>{team2.ptsQtr4}</td>
        </tr>
        <tr>
          <td>{team1.teamAbbreviation}</td>
          <td>{team1.ptsQtr1}</td>
          <td>{team1.ptsQtr2}</td>
          <td>{team1.ptsQtr3}</td>
          <td>{team1.ptsQtr4}</td>
        </tr>
      </tbody>
    </table>
  )
}
