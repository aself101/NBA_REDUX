import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.renderLinks = this.renderLinks.bind(this);
  }
  renderLinks() {
      if (this.props.authenticated) {
        return [
          <li className="nav-item" key={'1F'}><a className="nav-link" href="#">Welcome back <b>{ this.props.email }</b></a></li>,
          <li className="nav-item" key={'2F'}><Link className="nav-link" to="/profile">Profile</Link></li>,
          <li className="nav-item" key={'3F'}><Link className="nav-link" to="/signout">Sign Out</Link></li>
        ];
      } else {
        return [
          <li className="nav-item" key={1}><Link to="/signin" className="nav-link">Sign In</Link></li>,
          <li className="nav-item" key={2}><Link to="/signup" className="nav-link">Sign Up</Link></li>
        ];
      }
  }
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Home</Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              { this.renderLinks() }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    email: localStorage.getItem('email')
  };
}

export default connect(mapStateToProps)(Navbar);
