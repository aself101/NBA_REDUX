import React from 'react';
import { TEAM_IMG_URL } from '../../../actions';

const PlayerTeamHeader = ({team1, team2, gameInfo}) => {
  var t1WinsLosses = team1.teamWinsLosses;
  var t2WinsLosses = team2.teamWinsLosses;
  var t1Pts = team1.pts;
  var t2Pts = team2.pts;
  var ptStyle = {
    fontSize: 35
  };
  var tv;
  if (gameInfo.natlTvBroadcasterAbbreviation)
    tv = gameInfo.natlTvBroadcasterAbbreviation;
  else tv = '';

  return (
    <div className="container-fluid">
      <div className="row">
        <center>
          <h4 className="modal-title">{gameInfo.gameStatusText} {gameInfo.livePcTime}</h4>
          <b>{tv}</b>
        </center>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <span className="boxscores-left">
            <center>
              <h4 className="modal-title" id={team1.teamCityName}>{team1.teamCityName}</h4>
              <img src={`${TEAM_IMG_URL}/${team1.teamAbbreviation}.svg`} height="55" width="55" /> <br />
              <b style={ptStyle}>{ t1Pts ? t1Pts : t1WinsLosses }</b>
            </center>
          </span>
        </div>
        <div className="col-sm-6">
          <span className="boxscores-right">
            <center>
              <h4 className="modal-title" id={team2.teamCityName}>{team2.teamCityName}</h4>
              <img src={`${TEAM_IMG_URL}/${team2.teamAbbreviation}.svg`} height="55" width="55" /> <br />
              <b style={ptStyle}>{ t2Pts ? t2Pts : t2WinsLosses }</b>
            </center>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerTeamHeader;
































/* END */
