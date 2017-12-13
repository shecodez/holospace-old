import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon, Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateChannel } from "../../actions/channels";

// components
import ChannelForm from "../forms/channelForm";

class Channel extends React.Component {

  state = {
    isOpen: false
  };

  setChannel = () => { /* this.props.onChannelSelect(this.props.channel); */ };

  submit = data => {
    this.toggleModal();
    this.props.updateChannel(data);
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const { channel, serverId } = this.props;

    const isSelected = this.props.isSelected ? " is-current-channel" : "";

    const prepend =
      channel.type === "Text" ? "# " : <Icon name="angle right" />;

    const url =
      channel.type === "VR"
        ? `/channels/${serverId}/vr/${channel._id}`
        : `/channels/${serverId}/${channel._id}`;

    return (
      <li className={`channel ${isSelected}`}>
        <Link
          to={url}
          className="select-channel-link"
          onClick={this.setChannel}
        >
          <span className="prepend">{prepend}</span> {channel.name}
        </Link>

        <Button icon="setting" onClick={this.toggleModal} />

        <Modal size={"small"} open={isOpen} onClose={this.toggleModal}>
          <Modal.Header>Update Channel</Modal.Header>
          <Modal.Content>
            <ChannelForm channel={channel} submit={this.submit} type={channel.type} />
          </Modal.Content>
        </Modal>
      </li>
    );
  }
}

Channel.propTypes = {
  channel: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    topic: PropTypes.string
  }).isRequired,
  // onChannelSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  serverId: PropTypes.string.isRequired,
  updateChannel: PropTypes.func.isRequired
};

export default connect(null, { updateChannel })(Channel);
