import React from "react";
import PropTypes from "prop-types";
import { Button, List, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchServerMembers } from "../../actions/memberships";

// components
import User from '../user/user';
import UserCard from '../user/userCard';

class Members extends React.Component {

  state = {
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

  render() {

    const { members } = this.props;

    const online = []; // 'away' & 'busy' goes here too?
    const offline = [];

    if (members) {
      members.forEach((member) => {
        switch(member.online) {
          case true:
            // if (membership.member_id.status ==="Hide") offline.push()
            online.push(
              <List.Item key={member.email}>
                <Popup
                  trigger={<Button><User user={member} /></Button>}
                  content={<UserCard user={member} joined={member.joined} />}
                  on='click'
                  offset={50}
                  position='left center'

                  wide='very'
                />
              </List.Item>
            );
            break;

          default:
            offline.push(
              <List.Item key={member.email}>
                <Popup
                  trigger={<Button><User user={member} /></Button>}
                  content={<UserCard user={member} joined={member.joined} />}
                  on='click'
                  offset={50}
                  position='left center'

                  wide='very'
                />
              </List.Item>
            );
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
          <Button icon="plus" />
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
      </div>
    );
  }
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
  }).isRequired
}

function mapStateToProps(state) {
  return {
    members: state.memberships
  };
}

export default connect(mapStateToProps, { fetchServerMembers })(Members);
