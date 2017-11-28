import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import { createServer } from "../../actions/servers";

// components
import ServerForm from "../forms/serverForm";

class AddServer extends React.Component {
  state = {
    isOpen: false
  };

  submit = data => {
    this.toggleModal();
    this.props.createServer(data);
      /* .then((server) => {
        // this.props.history.push("/channels/:server._id/:server.default_id")
        console.log(server);
      }); */
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div className="add-server">
        <Button inverted basic circular size='huge' icon="plus" onClick={this.toggleModal} />

        <Modal size={"small"} open={isOpen} onClose={this.toggleModal}>
          <Modal.Header>Create New Server</Modal.Header>
          <Modal.Content>
            <ServerForm submit={this.submit} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

AddServer.propTypes = {
  /* history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired, */
  createServer: PropTypes.func.isRequired
};

export default connect(null, { createServer })(AddServer);
