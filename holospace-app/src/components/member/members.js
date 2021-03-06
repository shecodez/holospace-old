import React from "react";
import PropTypes from "prop-types";
import { Button, List, Popup, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchServerMembers } from "../../actions/memberships";

// components
import User from '../user/user';
import UserCard from '../user/userCard';
import MembershipForm from '../forms/membershipForm';

class Members extends React.Component {

  state = {
    isOpen: false,
    serverId: this.props.match.params.serverId
  };

  componentDidMount() {
    this.props.fetchServerMembers(this.state.serverId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.serverId !== this.state.serverId)
      this.props.fetchServerMembers(nextProps.match.params.serverId);

    this.setState({ serverId: nextProps.match.params.serverId });
  }

  submit = data => {
    this.toggleModal();
    console.log(data);
    // this.props.createMembership(data);
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const { members, server } = this.props;

    const online = []; // 'away' & 'busy' goes here too?
    const offline = [];

    if (members && server) {
      members.forEach((member) => {
        const memberPopup =
          <List.Item key={member.email}>
            <Popup
              trigger={<Button><User user={member} /></Button>}
              content={<UserCard member={member} joined={member.joined} owner={server.owner_id} />}
              on='click'
              offset={50}
              position='left center'

              wide='very'
            />
          </List.Item>;

        switch(member.online) {
          case true:
            /* if (member.status === "Hide")
              offline.push(memberPopup);
            else */
              online.push(memberPopup);
            break;

          default:
            offline.push(memberPopup);
        }
      });
    }

    return (
      <div className="members">
        <div className="header">
          <div>
            <Button icon="chevron right" />
            <h3>Members {`(${members.length})`}</h3>
          </div>
          <Button icon="plus" onClick={this.toggleModal} />
        </div>
        <div className="scroll-y">
          <h4 className="toggle-online-members-btn">Online{`(${online.length})`}</h4>
          <List className="online-users">
            {online}
          </List>

          <h4 className="toggle-offline-members-btn">Offline{`(${offline.length})`}</h4>
          <List className="offline-users">
            {offline}
          </List>
        </div>

        <Modal size={"small"} open={isOpen} onClose={this.toggleModal}>
          <Modal.Header>Join A Server</Modal.Header>
          <Modal.Content>
            <p>Enter an invite code to become a member of an existing server.</p>

            <MembershipForm submit={this.submit} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

Members.defaultProps = {
  server: null
}

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    member: PropTypes.object
  })).isRequired,
  fetchServerMembers: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string.isRequired
    })
  }).isRequired,
  server: PropTypes.shape({
    owner_id: PropTypes.shape({
      username: PropTypes.string,
      pin: PropTypes.number
    })
  })
}

function mapStateToProps(state, props) {
  return {
    server: state.servers.find(server => server._id === props.match.params.serverId),
    members: state.memberships
  };
}

export default connect(mapStateToProps, { fetchServerMembers })(Members);
