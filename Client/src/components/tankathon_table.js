import React from 'react';

import { TEAM_IMG_URL } from '../actions';

function calcPercent(pct) {
  return Math.floor(pct * 100);
}
// Process teamnames, abbr from scraping tankathon.com table
function processTeamNames(team) {
  var _team = team.split(' ');
  var teamAbr, teamName, teamSplit;
  if (_team.length === 1) {
    teamSplit = _team[0].split(/(?=[A-Z])/);
    teamName = teamSplit[0];
    teamAbr = teamSplit.slice(1, teamSplit.length).join('');
    return (
      <span>
        <img src={`${TEAM_IMG_URL}/${teamAbr}.svg`}
          height="36" width="36"
        />{"\u00a0"}
        <b>{teamName}</b>
      </span>
    );
  } else if (_team.length === 2) {
    var firstTeamName = _team[0];
    var lastTeamName = _team[1].split(/(?=[A-Z])/)[0];
    var fullTeamName = `${firstTeamName} ${lastTeamName}`;
    teamAbr = _team[1].split(/(?=[A-Z])/).slice(1).join('');
    switch (teamAbr) {
      case 'NO':
        teamAbr = 'NOP';
        break;
      case 'NY':
        teamAbr = 'NYK';
        break;
      case 'SA':
        teamAbr = 'SAS';
        break;
      default:
        break;
    }
    return (
      <span>
        <img src={`${TEAM_IMG_URL}/${teamAbr}.svg`}
          height="36" width="36"
        />{"\u00a0"}
        <b>{fullTeamName}</b>
      </span>
    );
  } else if (_team.length > 2) {
      _team = _team.filter((item) => item !== "");
      switch (true) {
        case (_team.length === 2):
          var fromTeam = _team[0].split(/(?=[A-Z])/)[0];
          var fromTeamAbbr = _team[0].split(/(?=[A-Z])/).slice(1).join('');
          var toTeamAbbr = _team[1];

          return (
            <span>
              <img src={`${TEAM_IMG_URL}/${fromTeamAbbr}.svg`}
                height="36" width="36"
              />{"\u00a0"}
              {fromTeam}
              {"\u00a0"}
              <i className="fa fa-hand-o-right" aria-hidden="true"></i>
              {"\u00a0"}
              <b>{toTeamAbbr}</b>
              <img src={`${TEAM_IMG_URL}/${toTeamAbbr}.svg`}
                height="36" width="36"
              />
            </span>
          );
        case (_team.length === 3):
          var fromTeam = `${_team[0]} ${_team[1].split(/(?=[A-Z])/)[0]}`;
          var fromTeamAbbr = _team[1].split(/(?=[A-Z])/).slice(1).join('');
          var toTeamAbbr = _team[2];
          if (fromTeamAbbr === 'GS') fromTeamAbbr = 'GSW';
          if (toTeamAbbr === 'GS') toTeamAbbr = 'GSW';
          if (fromTeamAbbr === 'NO') fromTeamAbbr = 'NOP';
          if (toTeamAbbr === 'NO') toTeamAbbr = 'NOP';
          return (
            <span>
              <img src={`${TEAM_IMG_URL}/${fromTeamAbbr}.svg`}
                height="36" width="36"
              />{"\u00a0"}
              {fromTeam}
              {"\u00a0"}
              <i className="fa fa-hand-o-right" aria-hidden="true"></i>
              {"\u00a0"}
              <b>{toTeamAbbr}</b>
              <img src={`${TEAM_IMG_URL}/${toTeamAbbr}.svg`}
                height="36" width="36"
              />
            </span>
          );
        default:
          return;
      }
    } else {
      return;
    }
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
            //console.log(team);
            return (
              <tr key={team.team}>
                <td>{index + 1}</td>
                <td>{processTeamNames(team.team)}</td>
                <td>{team.record}</td>
                <td>{calcPercent(team.winPct)}%</td>
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
