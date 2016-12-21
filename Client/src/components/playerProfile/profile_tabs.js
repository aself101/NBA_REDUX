import React from 'react';


const ProfileTabs = ({ playerInfo, playerStats }) => {
  if (!playerInfo) return <span></span>;

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
          Stats
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
