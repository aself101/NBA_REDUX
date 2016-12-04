import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.state = {
      emailError: false,
      passError1: false,
      passError2: false,
      passError3: false,
      passError4: false
    };
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
  handleFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(re)) {
      this.setState({ emailError: true });
      return;
    }
    if (password === '') {
      this.setState({ passError1: true });
      return;
    }
    if (passwordConfirm === '') {
      this.setState({ passError4: true });
      return;
    }
    if (password !== passwordConfirm) {
      this.setState({ passError2: true });
      return;
    }
    if (password.length < 5) {
      this.setState({ passError3: true });
      return;
    }
    this.setState({
      emailError: false,
      passError1: false,
      passError2: false,
      passError3: false,
      passError4: false
    }, () => {
      document.getElementById('signup-email').value = '';
      document.getElementById('signup-password').value = '';
      document.getElementById('password-confirm').value = '';
      return this.props.signupUser({email, password});
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3"></div>
          <div className="col-xs-6">
            <p className="help-block">Sign Up!</p>
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
              <fieldset className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" className="form-control" id="signup-email" placeholder="Email" />
                { this.state.emailError ? <span className="error">Must have a correct email address</span> : '' }
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="signup-password">Password:</label>
                <input type="password" className="form-control" id="signup-password" placeholder="Password" />
                { this.state.passError1 ? <div><span className="error">Please enter a password</span><br /></div> : '' }
                { this.state.passError2 ? <div><span className="error">Passwords must match</span><br /></div> : '' }
                { this.state.passError3 ? <div><span className="error">Password must be greater than 5 characters</span><br /></div> : '' }
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="password-confirm">Password Confirmation:</label>
                <input type="password" className="form-control" id="password-confirm" placeholder="Password Confirm" />
                { this.state.passError4 ? <div><span className="error">Please confirm the password</span><br /></div> : '' }
              </fieldset>
              { this.renderAlert() }
              <button action="submit" className="btn btn-primary">Sign Up</button>
              <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google-plus"></span> Google</a>
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


export default connect(mapStateToProps, actions)(SignUp);


































/* END */
