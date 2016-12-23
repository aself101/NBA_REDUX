import React from 'react';

import BoxscoreTable from './boxscore_table';
import TeamStats from './boxscoreTeamStats_table.js';
import LastMeeting from './boxscore_lastMeeting';
import { TEAM_IMG_URL } from '../../actions';



const Boxscore = ({team1, team2, gameInfo, lastMeeting}) => {
  if (!(team1 || team2)) return <span></span>;


  const team1ID = team1.teamId;
  const team2ID = team2.teamId;

  return (
    <div> <br />
      <div className="card boxscores">
        <div className="panel panel-light">
          <div className="panel-heading boxscore-team-img-wrap">
            <div className="row">
              <div className="boxscore-team-score">
                <div>

                  <div className="boxscore-team-img">
                    <img className="img-responsive"
                      src={`${TEAM_IMG_URL}/${team2.teamAbbreviation}.svg`}
                      height="45" width="45"
                    />
                  </div>
                  <p className="help-block">{team2.teamWinsLosses}</p>
                  <span className="boxscore-team-flex">
                    <b>{team2.teamAbbreviation}</b>

                  </span>
                  <span className="boxscore-team-name">
                    <h3 className="panel-title"> <span id={team2ID}><b>{team2.pts}</b></span></h3>
                  </span>
                </div>
                <div>
                  <h5>{gameInfo.gameStatusText}</h5>
                  <h5>{gameInfo.livePcTime}</h5>
                  <h5>{ gameInfo.natlTvBroadcasterAbbreviation ? gameInfo.natlTvBroadcasterAbbreviation : ''}</h5>
                </div>
                <div>

                  <div className="boxscore-team-img">
                    <img className="img-responsive"
                      src={`${TEAM_IMG_URL}/${team1.teamAbbreviation}.svg`}
                      height="45" width="45"
                    />
                  </div>
                  <p className="help-block">{team1.teamWinsLosses}</p>
                  <span className="boxscore-team-flex">
                    <b>{team1.teamAbbreviation}</b>

                  </span>
                  <span className="boxscore-team-name">
                    <h3 className="panel-title"><span id={team1ID}><b>{team1.pts}</b></span></h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br /><br /><br />
          <div className="panel-body">
            <div className="row">
              <BoxscoreTable team1={team1} team2={team2} />
            </div>
            <div className="row">
              <LastMeeting last={lastMeeting} />
            </div><hr />
            <div className="row">
              <div className="col-sm-6">
                <div className="scores">
                  <TeamStats team={team2} />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="scores">
                  <TeamStats team={team1} />
                </div>
              </div>
            </div>
          </div>
           <div className="panel-footer">

           </div>
        </div>
      </div>
    </div>
  );
};



export default Boxscore;

































/* END */
