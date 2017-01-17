import { FETCH_TEAM } from '../actions/types';

function lastNameSortStats(a, b) {
  var aLast = a.playerName.split(" ")[1];
  var bLast = b.playerName.split(" ")[1];

  if (aLast < bLast) return -1;
  if (aLast > bLast) return 1;
  return 0;
}

function lastNameSortCommon(a, b) {
  var aLast = a.player.split(" ")[1];
  var bLast = b.player.split(" ")[1];

  if (aLast < bLast) return -1;
  if (aLast > bLast) return 1;
  return 0;
}

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TEAM:
      const teamPlayerStats = action.payload.teamStats[0].leagueDashPlayerStats.sort(lastNameSortStats);
      const coaches = action.payload.teamStats[1].coaches;
      const teamPlayerCommonInfo = action.payload.teamStats[1].commonTeamRoster.sort(lastNameSortCommon);
      const teamShootingStats = action.payload.teamStats[2].leagueDashPTShots[0];
      const teamShots = action.payload.teamStats[3].shot_Chart_Detail;
      return Object.assign({}, state, {
        teamPlayerStats,
        coaches,
        teamPlayerCommonInfo,
        teamShootingStats,
        teamShots
      });
    default:
      return state;
  }
}
























/* END */
