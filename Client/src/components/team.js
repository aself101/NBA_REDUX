import React from 'react';

import { TEAM_IMG_URL } from '../actions';

const Team = ({team, fetchTeam}) => {
  if (!team) return <span></span>;
  return (
    <div className="thumbnail" onClick={() => fetchTeam(team.teamId)}>
      <center>
        <img src={`${TEAM_IMG_URL}/${team.abbreviation}.svg`} />
        <hr />
        <b>{ team.teamName }</b>
      </center>
    </div>
  );
};

export default Team;
