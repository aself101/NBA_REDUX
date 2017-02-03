import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTeamNewsServer, TEAM_IMG_URL } from '../actions';
import Article from '../components/news/article';

class News extends Component {
  constructor(props) {
    super(props);
    this.getTeamNews = this.getTeamNews.bind(this);
  }
  getTeamNews(e, teamName) {
    return this.props.fetchTeamNews(e.target.id, teamName);
  }
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">News & Feeds</h1>
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group team-feed">
              {
                this.props.teams.map((team) => (
                  <li id={team.teamId} onClick={(e) => this.getTeamNews(e, team.teamName)}
                    className="list-group-item" key={`${team.teamId}${team.teamName}`}>
                    <img src={`${TEAM_IMG_URL}/${team.abbreviation}.svg`} height="40" width="40" />
                    { team.teamName } News
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div className="btn-group" role="group">
                <button className="btn btn-large btn-default" id="espn" onClick={(e) => this.getTeamNews(e, 'ESPN')}>ESPN News</button>
                <button className="btn btn-large btn-default" id="si" onClick={(e) => this.getTeamNews(e, 'SI')}>SI News</button>
              </div>
            </div>
            <div className="well well-sm">
              <center><h2>{ this.props.team }</h2></center>
            </div>
            <div className="row">
              <ul className="list-group team-feed">
                {
                  this.props.news.map((item) => (
                    <Article article={item} key={`${item.title}${item.link}`} />
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
    news: state.news.articles,
    team: state.news.team
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTeamNews: fetchTeamNewsServer
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(News);
