import React, { Component } from 'react';

import Server from './server';
import AddServer from './addServer';

class Servers extends Component {

  onAddServer(server) {
    this.props.addNewServer(server);
  }

  setServer(server) {
    this.props.setCurrentServer(server);
  }

  render() {
    let serverList;
    if (this.props.servers) {
      serverList = this.props.servers.map(server => {
        const isSelected = this.props.currentServerId === server.id;
        return ( <Server key={server.id} server={server} onSelect={this.setServer.bind(this)} isCurrentServer={isSelected} />);
      });
    }

    return (
      <div className="servers section">
        <button className="toggle-dm-btn">
          <img src='http://res.cloudinary.com/shecodez/image/upload/v1509660797/envelope-filled_tvyutt.png'alt="DM icon" />
          {/* <img src='http://res.cloudinary.com/shecodez/image/upload/v1509634910/envelope_rw7jal.png' alt="DM icon" /> */}
        </button>
        <p className="toggle-dm-label">DM</p>

        <hr/>

        Servers
        {serverList}
        <AddServer addServer={this.onAddServer.bind(this)} />
      </div>
    );
  }
}

export default Servers;
