import React, { Component } from 'react';

import ServerLI from './serverLI';
import AddServer from './addServer';

class Servers extends Component {

  onAddServer(server) {
    //console.log(server);
    let servers = this.props.servers;
    servers.push(server);
    this.setState({servers:servers});
  }

  render() {
    let serverList;
    if (this.props.servers) {
      serverList = this.props.servers.map(server => {
        //console.log(server);
        return ( <ServerLI key={server.id} server={server} /> );
      });
    }

    return (
      <div className="servers section">
        Servers
        {serverList}
        <AddServer addServer={this.onAddServer.bind(this)} />
      </div>
    );
  }
}

export default Servers;
