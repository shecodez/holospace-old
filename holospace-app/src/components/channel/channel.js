import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

class Channel extends React.Component {

  setChannel = () => { this.props.onChannelSelect(this.props.channel); }

  render() {
    const { channel } = this.props;
    const isSelected = this.props.isSelected ? " is-current-channel" : "";

    const prepend = (channel.type === 'Text') ? "# " : <Icon name="angle right" />

    return (
      <li className={`channel ${ isSelected }`}>
        <Link to="#" className="select-channel-link" onClick={this.setChannel}>
          <span className="prepend">{ prepend }</span> {channel.name}
        </Link>

        <Button icon="setting" />
      </li>
    );
  }
}

Channel.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  onChannelSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Channel;
