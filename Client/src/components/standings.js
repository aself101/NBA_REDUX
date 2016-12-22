import React from 'react';
import StandingsTable from './standings_table';

const Standings = ({standings}) => {
  if (!standings) return <span></span>;
  const east = standings.east;
  const west = standings.west;
  return (
    <div className="container-fluid">
      <h1 className="page-header">Standings</h1>
      <div id="standings">
        <div>
          <StandingsTable standings={east} />
        </div>
        <hr />
        <div>
          <StandingsTable standings={west} />
        </div>
      </div>
    </div>

  );
}

export default Standings;






















/* END */
