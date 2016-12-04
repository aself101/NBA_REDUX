import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    this.props.signinUser({email, password});
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Warning!</strong> Better check yourself, { this.props.errorMessage }.
        </div>
      )
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3"></div>
          <div className="col-xs-6">
            <p className="help-block">Sign In!</p>
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
              <fieldset className="form-group">
                <label htmlFor="signin-email">Email:</label>
                <input type="text" className="form-control" id="signin-email" placeholder="Email" />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="signin-password">Password:</label>
                <input type="password" className="form-control" id="signin-password" />
              </fieldset>
              { this.renderAlert() }
              <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
          </div>
          <div className="col-xs-3"></div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}


export default connect(mapStateToProps, actions)(SignIn);
































/* END */
