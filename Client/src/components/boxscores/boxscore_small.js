import React from 'react';
import { TEAM_IMG_URL } from '../../actions';

/*
  Small boxscores that to display at top of page; when clicked
  pop out a modal to display team/player stats
*/

const SmallBoxScore = ({team1, team2, gameInfo, fetchBoxScoresTPInfo}) => {
  var t1WinsLosses = team1.teamWinsLosses;
  var t2WinsLosses = team2.teamWinsLosses;
  var t1Pts = team1.pts;
  var t2Pts = team2.pts;
  var gameId = team1.gameId;
  var tv;
  if (gameInfo.natlTvBroadcasterAbbreviation)
    tv = gameInfo.natlTvBroadcasterAbbreviation;
  else tv = '';
  return (
    <div className="thumbnail small-box-scores" onClick={() => fetchBoxScoresTPInfo(gameId)} data-toggle="modal" data-target={`#${gameId}`}>
      <div className="row">
        <div className="col-sm-12">
          <p className="help-block">
            {gameInfo.gameStatusText}{"\u00a0"}{"\u00a0"}
            {gameInfo.livePcTime}
            <span className="boxscores-right"><b>{tv}</b></span>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <img src={`${TEAM_IMG_URL}/${team1.teamAbbreviation}.svg`} height="25" width="25" />{team1.teamAbbreviation}
            <span className="boxscores-right">{ t1Pts ? t1Pts : t1WinsLosses }</span><br />
          <img src={`${TEAM_IMG_URL}/${team2.teamAbbreviation}.svg`} height="25" width="25" />{team2.teamAbbreviation}
            <span className="boxscores-right">{ t2Pts ? t2Pts : t2WinsLosses }</span>
        </div>
      </div>
    </div>
  );
}

export default SmallBoxScore;


















/* END */
