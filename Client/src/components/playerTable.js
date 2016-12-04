import React, { Component } from 'react';


class PlayerTable extends Component {
  constructor(props) {
    super(props);
    this.mapPlayers = this.mapPlayers.bind(this);
    this.renderPages = this.renderPages.bind(this);
    this.filterPlayers = this.filterPlayers.bind(this);
    this.state = {
      curPag: 10,
      prevPag: 0
    };
  }
  mapPlayers() {
    return this.props.players.map((player) => (
      <tr key={player.playerId}>
        <td>{ player.fullName }</td>
        <td>{ player.playerId }</td>
        <td>{ player.teamId }</td>
      </tr>
    ));//.filter(this.filterPlayers);
  }

  renderPages() {
    var count = 0;
    return this.props.players.map((player, index) => {
      if (index === 0) return;
      else if (index % 20 === 0) {
        count++;
        return (
          <li id={`__${count}__`} key={`${Math.random()}${player.playerId}`}>
            <a id={count}>{count}</a>
          </li>
        );
      }
    });
  }
  filterPlayers(element, index, array) {
    return this.state.prevPag <= this.state.curPag &&
      index <= this.state.curPag &&
      index >= this.state.prevPag;
  }
  render() {
    return (
      <div>
        <table className="table table-responsibe table-bordered table-highlighted">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Player ID</th>
              <th>Team ID</th>
            </tr>
          </thead>
          <tbody>
            { this.mapPlayers() }
          </tbody>
        </table>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
              { this.renderPages() }
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

export default PlayerTable;
