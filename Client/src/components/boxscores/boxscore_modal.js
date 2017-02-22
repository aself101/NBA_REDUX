import React from 'react';
import { TEAM_IMG_URL } from '../../actions';

import PlayerTeamHeader from './modal/player_team_header';
import PlayerTeamBody from './modal/player_team_body';

const BoxscoreModal = ({team1, team2, gameInfo, gameStats}) => {
  var gameId = team1.gameId;
  return (
    <div className="modal fade" id={gameId} tabIndex="-1" role="dialog" aria-labelledby={gameId}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <PlayerTeamHeader team1={team1} team2={team2} gameInfo={gameInfo} />
          </div>
          <div className="modal-body">
            <PlayerTeamBody team1={team1} team2={team2} gameStats={gameStats} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BoxscoreModal;































/* END */
