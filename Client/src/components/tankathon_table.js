import React from 'react';

import { TEAM_IMG_URL } from '../actions';

function calcPercent(pct) {
  return Math.floor(pct * 100);
}

const TankathonTable = ({standings}) => {
  if (!standings) return <span></span>;
  return (
    <table className="table table-responsive table-hover table-bordered">
      <thead>
        <tr>
          <th>PICK</th>
          <th>TEAM</th>
          <th>RECORD</th>
          <th>WIN%</th>
          <th>GB</th>
          <th>STREAK</th>
          <th>L10</th>
          <th>TOP 3</th>
          <th>#1 OVR</th>
        </tr>
      </thead>
      <tbody>
        {
          standings.map((team, index) => {
            /* If a team can be split; a pick is being swapped or handed over */

            return (
              <tr key={team.team}>
                <td>{index + 1}</td>
                <td>{team.team}</td>
                <td>{team.record}</td>
                <td>{team.winPct}</td>
                <td>{team.gb}</td>
                <td>{team.streak}</td>
                <td>{team.l10}</td>
                <td>{team.top3}</td>
                <td>{team.num1Ovr}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default TankathonTable;
