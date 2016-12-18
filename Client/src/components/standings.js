import React from 'react';
import StandingsTable from './standings_table';

const Standings = ({standings}) => {
  if (!standings) return <span></span>;
  const east = standings.eastStandings;
  const west = standings.westStandings;

  return (
    <div className="container-fluid">
      <div>
        <StandingsTable standing={east} />
      </div>
      <hr />
      <div>
        <StandingsTable standing={west} />
      </div>
    </div>

  );
}

export default Standings;






















/* END */
