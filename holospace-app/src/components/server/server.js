import React, { Component } from 'react';

class Server extends Component {

  constructor() {
    super();
    this.state = {
      selectedServer: {}
    }
    this.setServer = this.setServer.bind(this);
  }

  setServer () {
    this.setState({
      selectedServer: this.props.server
    }, function() {
      // console.log(this.state.selectedServer);
      this.props.onSelect(this.state.selectedServer);
    });
  }

  render() {
    const currentServer = this.props.isCurrentServer ? " is-current-server" : "";
    return (
      <li className={`server${ currentServer}`} onClick={this.setServer}>
        <div className="dot">
          <div className="circle" />
          <div className="ring" />
        </div>
        <a href="#" data-tooltip={this.props.server.name}>
          <img src={this.props.server.icon_url} alt="server icon"  />
        </a>
      </li>
    );
  }
}

export default Server;
