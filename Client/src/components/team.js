import React from 'react';

import { TEAM_IMG_URL } from '../actions';

const Team = ({team}) => {
  if (!team) return <span></span>;
  return (
    <div className="thumbnail">
      <center>
        <img src={`${TEAM_IMG_URL}/${team.abbreviation}.svg`} />
        <hr />
        <b>{ team.teamName }</b>
      </center>
    </div>
  );
};

export default Team;
