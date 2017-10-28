import React, { Component } from 'react';

class ServerLI extends Component {
  render() {
    return (
      <li className="server">
        <a href="#" data-tooltip={this.props.server.name}>
          <img src={this.props.server.icon_url} alt="server icon"  />
        </a>
      </li>
    );
  }
}

export default ServerLI;
