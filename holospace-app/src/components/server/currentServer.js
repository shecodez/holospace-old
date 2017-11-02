import React, { Component } from 'react';

class CurrentServer extends Component {
  render() {
    return (
      <div className="current-server section">
        <h3 className="server-name">
          {this.props.currentServer.name}
        </h3>
      </div>
    );
  }
}

export default CurrentServer;
