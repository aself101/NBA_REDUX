import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
  }
  componentWillMount() {
    this.props.fetchUsers();
  }
  renderUser(user) {
    if (!user.company) return;
    return (
      <div key={ user.id } className="thumbnail">
        <div className="caption">
          <h4>{ user.name }</h4>
          <p className="help-block">{ user.company.name }</p>
          <a href={user.website} className="btn btn-primary">{ user.website }</a>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="user-list">
        { this.props.users.map(this.renderUser) }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps, actions)(UserList);
