import React from 'react';
import PlayerTable from './modal_player_table';
import { TEAM_IMG_URL } from '../../../actions';

const PlayerTeamBody = ({team1, team2, gameStats}) => {
  var t1Players, t2Players, t1Img, t2Img, t1ID, t2ID, t1Stats, t2Stats;
  if (!gameStats.players) {
    // Catch early errors where no data is available
    t1Players = [];
    t2Players = [];
    t1Img = 'img/nba-logo.png';
    t2Img = 'img/nba-logo.png';
  }
  else {
    t1Players = gameStats.players.team1;
    t2Players = gameStats.players.team2;
    t1Img = `${TEAM_IMG_URL}/${team1.teamAbbreviation}.svg`;
    t2Img = `${TEAM_IMG_URL}/${team2.teamAbbreviation}.svg`;
    t1ID = team1.teamId;
    t2ID = team2.teamId;
    t1Stats = gameStats.teams[0];
    t2Stats = gameStats.teams[1];
  }
  return (
    <div className="container-fluid">
      <ul className="nav nav-tabs nav-justified">
        <li role="presentation" className="active">
          <a href={`#${t1ID}`} role="tab" data-toggle="tab">
            <img src={t1Img} onError={(e) => e.src='img/nba-logo.png'} />
          </a>
        </li>
        <li role="presentation">
          <a href={`#${t2ID}`} role="tab" data-toggle="tab">
            <img src={t2Img} onError={(e) => e.src='img/nba-logo.png'} />
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div role="tabpanel" className="tab-pane active" id={`${t1ID}`}>
          <PlayerTable players={t1Players} teamStats={t1Stats} />
        </div>
        <div role="tabpanel" className="tab-pane" id={`${t2ID}`}>
          <PlayerTable players={t2Players} teamStats={t2Stats} />
        </div>
      </div>

    </div>
  );
};

export default PlayerTeamBody;






























/* END */
