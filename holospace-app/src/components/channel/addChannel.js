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
    this.props.createChannel(data);
      /* .then((channel) => {
        // this.props.history.push("/channels/:channel.server_id/:channel._id")
        console.log(channel);
      }); */
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
          <Button icon="plus" onClick={this.toggleModal} />
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
  /* history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired, */
  createChannel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default connect(null, { createChannel })(AddChannel);
