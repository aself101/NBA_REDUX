import React from 'react';
import toAge from 'to-age';

import { TEAM_IMG_URL } from '../../actions';

const ProfileIntro = ({player, defaultImg}) => {
  if (!player) return <span></span>;
  const birthDate = player.birthdate.split('T')[0];

  return (
    <div className="box box-primary">
      <div className="box-body box-profile">
        <img className="profile-user-img img-responsive img-circle"
          id="player-pic"
          src={player.img}
          onError={(e) => e.target.src=defaultImg }
        />
        <h3 className="profile-username text-center">{ player.displayFirstLast }</h3>
        <p className="text-muted text-center"></p>

        <ul className="list-group">
          <li className="list-group-item">
            <b>Team</b> <a className="pull-right">{ player.teamCity } { player.teamName }</a>
            <center>
              <img src={`${TEAM_IMG_URL}/${player.teamAbbreviation}.svg`}
                height="90" width="90"
              />
            </center>
          </li>
          <li className="list-group-item">
            <b>Position</b> <a className="pull-right">{ player.position }</a>
          </li>
          <li className="list-group-item">
            <b>Age</b> <a className="pull-right">{ toAge(birthDate) }</a>
          </li>
          <li className="list-group-item">
            <b>Seasons</b> <a className="pull-right">{ player.seasonExp }</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileIntro;



























/* END */
