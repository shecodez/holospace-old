import React from "react";
import axios from "axios";

// components
import Server from "./server";
import AddServer from "./addServer";

class Servers extends React.Component {

  state = {
    servers: [],
    server: null
  };

  componentDidMount() {
    axios.get("/api/servers").then(res => {
      this.setState({ servers: res.data });
    });
  }

  setServer = server => this.setState({ server });

  render() {
    const { servers } = this.state;

    let serverList;
    if (servers) {
      serverList = servers.map(server => {
        const isSelected = (this.state.server || servers[0])._id === server._id;
        return (
          <Server
            key={server._id}
            server={server}
            onServerSelect={this.setServer}
            isSelected={isSelected}
          />
        );
      });
    }

    return (
      <div className="servers">
        <h4>Servers</h4>
        {serverList}

        <AddServer />
      </div>
    );
  }
}

export default Servers;
