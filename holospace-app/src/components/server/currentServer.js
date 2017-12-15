import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchServer, updateServer } from "../../actions/servers";

// components
import ServerForm from "../forms/serverForm";

class CurrentServer extends React.Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    if (this.props.match.params.serverId) {
      this.props.fetchServer(this.props.match.params.serverId);
    }
  }

  submit = data => {
    this.toggleModal();
    this.props.updateServer(data);
    // this.props.updateServer(data).then(this.toggleModal());
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const { server } = this.props;

    return (
      <div className="current-server">
        {server && <h3 className="name">{server.name}</h3>}

        <Button icon="content" onClick={this.toggleModal} />

        <Modal size={"small"} open={isOpen} onClose={this.toggleModal}>
          <Modal.Header>Update Server</Modal.Header>
          <Modal.Content>
            <ServerForm server={server} submit={this.submit} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

CurrentServer.defaultProps = {
  server: null
};

CurrentServer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string.isRequired,
      channelId: PropTypes.string.isRequired
    })
  }).isRequired,
  server: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string
  }),
  fetchServer: PropTypes.func.isRequired,
  updateServer: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    server:
      state.servers.find(item => item._id === props.match.params.serverId) ||
      null
  };
}

export default connect(mapStateToProps, { fetchServer, updateServer })(CurrentServer);
