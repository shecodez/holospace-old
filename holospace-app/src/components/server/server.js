import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

class Server extends React.Component {

  setServer = () => { this.props.onServerSelect(this.props.server); };

  render() {
    const { server } = this.props;
    const isSelected = this.props.isSelected ? " is-current-server" : "";

    return (
      <li className={`server${ isSelected}`}>
        <div className="dot">
          <div className="circle" />
          <div className="ring" />
        </div>
        <Link to="#" data-tooltip={server.name} onClick={this.setServer}>
          <Image src={server.icon_url} size='tiny' circular />
        </Link>
      </li>
    );
  }
}

Server.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon_url: PropTypes.string.isRequired
  }).isRequired,
  onServerSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Server;
