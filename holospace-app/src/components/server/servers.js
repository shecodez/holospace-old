import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMemberServers } from "../../actions/memberships";

// components
import Server from "./server";
import AddServer from "./addServer";

class Servers extends React.Component {

  componentDidMount() {
    this.props.fetchMemberServers();
  }

  // setServer = server => this.setState({ server });

  render() {
    const { servers, match } = this.props;

    let serverList;
    if (servers) {
      serverList = servers.map(server => {
        let isSelected = false;
        if (match.params.serverId)
          isSelected = match.params.serverId === server._id;
        return (
          <Server
            key={server._id}
            server={server}
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
  servers: PropTypes.arrayOf(PropTypes.shape({
     server: PropTypes.object
   })).isRequired,
  fetchMemberServers: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string
    })
  }).isRequired
};

function mapStateToProps(state) {
  return {
    servers: state.servers
  };
}

export default connect(mapStateToProps, { fetchMemberServers })(Servers);
