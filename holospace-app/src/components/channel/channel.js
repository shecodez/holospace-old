import React from "react";
import PropTypes from "prop-types";
// import io from "socket.io-client";
import { Link } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateChannel } from "../../actions/channels";

// components
import ChannelForm from "../forms/channelForm";

class Channel extends React.Component {

  state = {
    isOpen: false
  };

  componentDidMount() {
    const { user } = this.props;

    if (this.props.match.params.channelId === this.props.channel._id) {
      this.props.socket.emit('channel:join', {
        channel: this.props.channel._id,
        avatar: user.avatar,
        username: `${user.username}#${user.pin}`
      });
    }
  }

  setChannel = () => {
    this.props.onChannelSelect(this.props.channel);
  };

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
      channel.type === "Text" ? "# " : "";

    let url = ''
    if (channel.direct) {
      url = `direct/channels/${channel._id}`;
    } else {
      url = channel.type === "VR"
        ? `/channels/${serverId}/vr/${channel._id}`
        : `/channels/${serverId}/${channel._id}`;
    }

    return (
      <div className={`channel ${isSelected}`}>
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
            {/* TODO: if channel.direct send form channel subscribers */}
            <ChannelForm channel={channel} submit={this.submit} type={channel.type} />
          </Modal.Content>
        </Modal>
      </div>
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
  onChannelSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  serverId: PropTypes.string.isRequired,
  updateChannel: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      channelId: PropTypes.string
    })
  }).isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    pin: PropTypes.number.isRequired
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { updateChannel })(Channel);
