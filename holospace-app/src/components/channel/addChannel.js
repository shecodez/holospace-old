import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import { createChannel } from "../../actions/channels";

// components
import ChannelForm from "../forms/channelForm";

class AddChannel extends React.Component {
  state = {
    isOpen: false
  };

  submit = data => {
    this.toggleModal();
    this.props.createChannel(this.addServerIdToChannel(data));
  };

  addServerIdToChannel = (data) => {
    const channel = {
      name: data.name,
      topic: data.topic,
      type: data.type,
      server_id: this.props.match.params.serverId
    };
    return channel;
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state

    return (
      <div>
        <div className="add-channel">
          <span>
            { `${this.props.type} channels` }
          </span>
          <Button compact icon="plus" onClick={this.toggleModal} />
        </div>

        <Modal size={"small"} open={isOpen} onClose={this.toggleModal}>
          <Modal.Header>{`Create new ${this.props.type} channel`}</Modal.Header>
          <Modal.Content>
            <ChannelForm submit={this.submit} type={this.props.type} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

AddChannel.propTypes = {
  createChannel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string.isRequired
    })
  }).isRequired
};

export default connect(null, { createChannel })(AddChannel);
