import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPlayerDataServer } from '../actions';
import ProfileIntro from '../components/playerProfile/profile_intro';
import ProfileAbout from '../components/playerProfile/profile_about';
import ProfileTabs from '../components/playerProfile/profile_tabs';

class Players extends Component {
  constructor(props) {
    super(props);
    this.getPlayer = this.getPlayer.bind(this);
  }
  componentDidMount() {
    $('#player-profile').css('display','none');
    if (this.props.players) {
      var p = [];
      this.props.players.map((player) => {
        p.push(player.fullName);
      });
      $("#players-list").typeahead({source: p});
    }
  }
  getPlayer(e) {
    const player = document.getElementById('players-list').value;
    let i;
    if (e.key === 'Enter') {
      for (i in this.props.players) {
        if (player === this.props.players[i].fullName) {
          document.getElementById('players-list').value = '';
          return this.props.fetchPlayerData(this.props.players[i].playerId, player);
        }
      }
      return;
    } else {
      for (i in this.props.players) {
        if (player === this.props.players[i].fullName) {
          document.getElementById('players-list').value = '';
          return this.props.fetchPlayerData(this.props.players[i].playerId, player);
        }
      }
      return;
    }

  }

  render() {
    const defaultImg = `img/nba-logo.png`;


    return (
      <div>
        <div className="page-header">
          <div className="input-group">

            <input
              className="form-control typeahead" placeholder="Player Search..."
              data-provide="typeahead" autoComplete="off" id="players-list"
              onKeyPress={this.getPlayer}
            />
            <span className="input-group-btn">
              <button onClick={this.getPlayer} className="btn btn-default" type="button">Go!</button>
            </span>
          </div>

        </div>
        <center><div><i className="fa fa-dribbble loading"></i></div></center>
        <section className="content" id="player-profile">
          <div className="row">
            <div className="col-md-3">
              <ProfileIntro player={this.props.playerInfo} defaultImg={defaultImg} />
              <ProfileAbout player={this.props.playerInfo} />
            </div>
            <div className="col-md-9">
              <ProfileTabs playerInfo={this.props.playerInfo} playerStats={this.props.playerStats} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
    playerStats: state.player.playerStats,
    playerInfo: state.player.playerInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPlayerData: fetchPlayerDataServer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);

































/* END */
