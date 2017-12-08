import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";

class Server extends React.Component {

  setServer = () => { this.props.onServerSelect(this.props.server); };

  render() {
    const { server } = this.props;
    const isSelected = this.props.isSelected ? " is-current-server" : "";

    return (
      <li className={`server ${ isSelected }`}>
        <div className="dot">
          <div className="circle" />
          <div className="ring" />
        </div>
        <Link to={`/channels/${server._id}/${server.default_id}`} onClick={this.setServer}>
          <Popup
            trigger={
              <Image src={server.icon} circular />
            }
            content={server.name}
            position='right center'
          />
        </Link>
      </li>
    );
  }
}

Server.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  onServerSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Server;
