import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    $(document.body).css("padding-top", "0px");
    this.props.signoutUser();
  }
  render() {
    return (
      <div className="container-fluid">
        <center>
          <h4>You have been signed out!</h4>
        </center>
      </div>
    );
  }
};

export default connect(null, actions)(SignOut);
