import React from "react";
import PropTypes from "prop-types";
import { Button, Popup, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import * as auth from "../../actions/auth";

// TODO: import icons for : no sound, mic, and VR
// [hear no evil], [speak no evil], [see no evil]

class StatusButtons extends React.Component {
  state = {
    isOpen: false
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render(){
    const { user, logout } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <Button.Group>
          <Popup
            trigger={<Button icon="headphone" />}
            content='Hear No Evil'
            inverted
            position='top center'
          />
          <Popup
            trigger={<Button icon="microphone" />}
            content='Speak No Evil'
            inverted
            position='top center'
          />
          <Popup
            trigger={<Button icon="gamepad" />}
            content='See No Evil'
            inverted
            position='top center'
          />
          <Popup
            trigger={<Button icon="setting" onClick={this.toggleModal} />}
            content='User Settings'
            inverted
            position='top center'
          />
        </Button.Group>

        <Modal size={"small"} open={isOpen} onClose={this.toggleModal} basic closeIcon>
          <Modal.Header>User Account</Modal.Header>
          <Modal.Content>
            {`${user.username}#${user.pin}`}
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={() => logout()}>
               Logout
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

StatusButtons.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    pin: PropTypes.number.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state)  {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout: auth.logout })(StatusButtons);
