import React from 'react';

import ProfileStats from '../../containers/profile_stats';
import SeasonChart from './profile_season_chart';

const colors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

const ProfileTabs = ({ playerInfo, playerStats }) => {
  if (!playerInfo && !playerStats) return <span></span>;

  return (
    <div role="navigation">
      <ul className="nav nav-pills">
        <li role="presentation" className="active"><a href="#playerstats" role="tab" data-toggle="tab">Stats</a></li>
        <li role="presentation"><a href="#playervideos" role="tab" data-toggle="tab">Videos</a></li>
        <li role="presentation"><a href="#playernews" role="tab" data-toggle="tab">News</a></li>
        <li role="presentation"><a href="#shotcharts" role="tab" data-toggle="tab">Shot Charts</a></li>
        <li role="presentation"><a href="#timeline" role="tab" data-toggle="tab">Timeline</a></li>
      </ul>

      <div className="tab-content">
        <div role="tabpanel" className="tab-pane active" id="playerstats">
          <div className="container-fluid">
            <div className="row">
              <ProfileStats />
              <hr />
              <SeasonChart playerStats={playerStats}
                type={"bar"} id={`barChart`}
                colors={'rgba(54, 162, 235, 0.2)'}
              />
              <hr />
              <SeasonChart playerStats={playerStats} type={"line"} id={'lineChart'}
                colors={'rgba(255, 99, 132, 0.2)'}
              />
            </div>
          </div>

        </div>
        <div role="tabpanel" className="tab-pane" id="playervideos">
          Videos
        </div>
        <div role="tabpanel" className="tab-pane" id="playernews">
          News
        </div>
        <div role="tabpanel" className="tab-pane" id="shotcharts">
          Shot Charts
        </div>
        <div role="tabpanel" className="tab-pane" id="timeline">
          Timeline
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;



































/* END */
