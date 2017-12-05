import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMemberServers } from "../../actions/memberships";
// components
import Server from "./server";
import AddServer from "./addServer";

class Servers extends React.Component {
  state = {
    server: null
  };

  componentDidMount() {
    this.props.fetchMemberServers();
  }

  setServer = server => this.setState({ server });

  render() {
    const { servers } = this.props;

    let serverList;
    if (servers) {
      serverList = servers.map(server => {
        let isSelected = false;
        if (this.state.server)
          isSelected = this.state.server._id === server._id;
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

Servers.propTypes = {
  servers: PropTypes.array.isRequired,
  fetchMemberServers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    servers: state.servers
  };
}

export default connect(mapStateToProps, { fetchMemberServers })(Servers);
