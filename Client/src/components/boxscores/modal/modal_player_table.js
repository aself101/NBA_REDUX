import React from 'react';

const PlayerTable = ({players, teamStats}) => {
  if (!teamStats) return <span></span>;
  return (
    <div className="boxscore-player-table">
      <table className="table table-responsive table-bordered table-hover table-condensed">
        <thead>
          <tr>
            <th>PLAYER</th>
            <th>MIN</th>
            <th>FG</th>
            <th>3PT</th>
            <th>FT</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>REB</th>
            <th>AST</th>
            <th>STL</th>
            <th>BLK</th>
            <th>TO</th>
            <th>PF</th>
            <th>PTS</th>
            <th>+/-</th>
          </tr>
        </thead>
        <tbody>
          {
            players.map((player) => {
              // Make sure +/- is displayed
              var plus_minus;
              if (Number.isInteger(player.PLUS_MINUS) && player.PLUS_MINUS > 0) {
                plus_minus = `+${player.PLUS_MINUS}`;
              } else plus_minus = `${player.PLUS_MINUS}`;
              return (
                <tr key={player.PLAYER_ID}>
                  <td>
                    <span>{player.PLAYER_NAME} <b className="pull-right">{player.START_POSITION}</b></span>
                  </td>
                  <td>{player.MIN}</td>
                  <td>{player.FGM}-{player.FGA}</td>
                  <td>{player.FG3M}-{player.FG3A}</td>
                  <td>{player.FTM}-{player.FTA}</td>
                  <td>{player.OREB}</td>
                  <td>{player.DREB}</td>
                  <td>{player.REB}</td>
                  <td>{player.AST}</td>
                  <td>{player.STL}</td>
                  <td>{player.BLK}</td>
                  <td>{player.TO}</td>
                  <td>{player.PF}</td>
                  <td>{player.PTS}</td>
                  <td>{plus_minus}</td>
                </tr>
              )
            })
          }
          <tr>
            <td></td>
            <td></td>
            <td><b>{ teamStats.FGM }-{ teamStats.FGA }</b></td>
            <td><b>{ teamStats.FG3M }-{ teamStats.FG3A }</b></td>
            <td><b>{ teamStats.FTM }-{ teamStats.FTA }</b></td>
            <td><b>{ teamStats.OREB }</b></td>
            <td><b>{ teamStats.DREB }</b></td>
            <td><b>{ teamStats.REB }</b></td>
            <td><b>{ teamStats.AST }</b></td>
            <td><b>{ teamStats.STL }</b></td>
            <td><b>{ teamStats.BLK }</b></td>
            <td><b>{ teamStats.TO }</b></td>
            <td><b>{ teamStats.PF }</b></td>
            <td><b>{ teamStats.PTS }</b></td>
            <td><b>{ teamStats.PLUS_MINUS }</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
































/* END */
