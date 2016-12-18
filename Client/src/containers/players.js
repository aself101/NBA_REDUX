import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Players extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //
  }

  render() {
    if (this.props.players) {
      var p = [];
      this.props.players.map((player) => {
        p.push(player.fullName);
      });
      $("#players-list").typeahead({source: p});
    }
    return (
      <div>
        <div className="page-header">
          <input
            className="form-control typeahead" placeholder="Player Search..."
            data-provide="typeahead" autoComplete="off" id="players-list"
          />
        </div>
        <section className="content">
          <div className="row">
            <div className="col-md-3">
              <div className="box box-primary">
                <div className="box-body box-profile">
                  <img className="profile-user-img img-responsive img-circle" src="img/nba-logo.png" alt="Player profile picture" />
                  <h3 className="profile-username text-center">{ this.props.selectedPlayer }</h3>
                  <p className="text-muted text-center"></p>

                  <ul className="list-group">
                    <li className="list-group-item">
                      <b>Team</b> <a className="pull-right">1,322</a>
                    </li>
                    <li className="list-group-item">
                      <b>Height</b> <a className="pull-right">543</a>
                    </li>
                    <li className="list-group-item">
                      <b>Weight</b> <a className="pull-right">13,287</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    players: state.players
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect()(Players);

































/* END */
