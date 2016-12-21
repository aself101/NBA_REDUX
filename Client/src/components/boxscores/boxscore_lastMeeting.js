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
                <span className="help-block">Away</span>
              </p>
            </center>
          </div>
          <div className="col-sm-6">
            <center>
              <p>
                <b>{last.lastGameHomeTeamName}</b> {last.lastGameHomeTeamPoints}
                <span className="help-block">Home</span>
              </p>
            </center>
          </div>
        </div>
    </div>
  )
};

export default LastMeeting;









































/* END */
