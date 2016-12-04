import React from 'react';
import BoxscoreTable from './boxscore_table';
import TeamStats from './boxscoreTeamStats_table.js';

const Boxscore = ({team1, team2}) => {
  if (!(team1 || team2)) return <span></span>;

  const team1ID = team1.teamId;
  const team2ID = team2.teamId;

  return (
    <div className="boxscores-wrapper"> <br />
      <div className="card boxscores">
        <div className="panel panel-light">
          <div className="panel-heading">
            <div className="row">
              <div className="col-sm-6">
                <center>
                  <img src={`img/${team1.teamAbbreviation}.png`} /> <br />
                </center>
              </div>
              <div className="col-sm-6">
                <center>
                  <img src={`img/${team2.teamAbbreviation}.png`} /> <br />
                </center>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <center>
                  {team1.teamAbbreviation}
                  <h3 className="panel-title"> <span id={team1ID}><b>{team1.pts}</b></span></h3>
                </center>
              </div>
              <div className="col-sm-6">
                <center>
                  {team2.teamAbbreviation}
                  <h3 className="panel-title"><span id={team2ID}><b>{team2.pts}</b></span></h3>
                </center>
              </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="row">
              <BoxscoreTable team1={team1} team2={team2} />
            </div>
          </div>
           <div className="panel-footer">
            <div className="row">
              <div className="col-sm-6">
                <div className="scores">
                  <TeamStats team={team1} />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="scores">
                  <TeamStats team={team2} />
                </div>
              </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};



export default Boxscore;

































/* END */
