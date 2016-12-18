import React from 'react';

// Last meeting display

function lastGameDate(d) {
  d = d.split('T')[0].split('-');
  d = `${d[1]}-${d[2]}-${d[0]}`;
  return d;
}

const LastMeeting = ({last}) => {

  return (
    <div>
      <center>
        <p className="help-block">Last Meeting<br /> {lastGameDate(last.lastGameDateEst)}</p>
      </center>
        <div className="row">
          <div className="col-sm-6">
            <center>
              <p>
                <b>{last.lastGameVisitorTeamName}</b> {last.lastGameVisitorTeamPoints}
              </p>
            </center>
          </div>
          <div className="col-sm-6">
            <center>
              <p>
                <b>{last.lastGameHomeTeamName}</b> {last.lastGameHomeTeamPoints}
              </p>
            </center>
          </div>
        </div>
    </div>
  )
};

export default LastMeeting;









































/* END */
