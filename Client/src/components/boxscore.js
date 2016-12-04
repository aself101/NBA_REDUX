import React from 'react';
import BoxscoreTable from './boxscore_table';
import TeamStats from './boxscoreTeamStats_table.js';

const Boxscore = ({team1, team2}) => {
  if (!(team1 || team2)) return <span></span>;

  const team1ID = team1.teamId;
  const team2ID = team2.teamId;

  return (
    <div> <br />
      <div className="card boxscores">
        <div className="panel panel-light">
          <div className="panel-heading">
            <center>
              <h3 className="panel-title">
                {team1.teamAbbreviation} <span id={team1ID}><b>{team1.pts}</b></span> - <span id={team2ID}><b>{team2.pts}</b></span> {team2.teamAbbreviation}
              </h3>
            </center>
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
