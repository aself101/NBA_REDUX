import React from 'react';
import { TEAM_IMG_URL } from '../../actions';

const BoxscoreModal = ({team1, team2, gameInfo, gameStats}) => {
  var gameId = team1.gameId;
  var t1WinsLosses = team1.teamWinsLosses;
  var t2WinsLosses = team2.teamWinsLosses;
  var t1Pts = team1.pts;
  var t2Pts = team2.pts;
  var ptStyle = {
    fontSize: 25
  };
  var tv;
  if (gameInfo.natlTvBroadcasterAbbreviation)
    tv = gameInfo.natlTvBroadcasterAbbreviation;
  else tv = '';
  return (
    <div className="modal fade" id={gameId} tabIndex="-1" role="dialog" aria-labelledby={gameId}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="row">
              <div className="col-sm-4">
                <span className="boxscores-left">
                  <center>
                    <h4 className="modal-title" id={team1.teamCityName}>{team1.teamCityName}</h4>
                    <img src={`${TEAM_IMG_URL}/${team1.teamAbbreviation}.svg`} height="45" width="45" /> <br />
                    <b style={ptStyle}>{ t1Pts ? t1Pts : t1WinsLosses }</b>
                  </center>
                </span>
              </div>
              <div className="col-sm-4">
                <center>
                  <h4 className="modal-title">{gameInfo.gameStatusText} {gameInfo.livePcTime}</h4>
                  <b>{tv}</b>
                </center>
              </div>
              <div className="col-sm-4">
                <span className="boxscores-right">
                  <center>
                    <h4 className="modal-title" id={team2.teamCityName}>{team2.teamCityName}</h4>
                    <img src={`${TEAM_IMG_URL}/${team2.teamAbbreviation}.svg`} height="45" width="45" /> <br />
                    <b style={ptStyle}>{ t2Pts ? t2Pts : t2WinsLosses }</b>
                  </center>
                </span>
              </div>
            </div>
          </div>
          <div className="modal-body">

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
