import React from "react";
// import PropTypes from "prop-types";
import { Button, List, Popup } from "semantic-ui-react";
import axios from "axios";

// components
import User from '../user/user';
import UserCard from '../user/userCard';

class Members extends React.Component {

  state = {
    memberships: [],
    serverId: "5a0f4bcb1c35354aa41d95bd"
  };

  componentDidMount() {
    axios.get(`/api/memberships/${this.state.serverId}/members`).then(res => {
      this.setState({ memberships: res.data });
    });
  }

  render() {
    const { memberships } = this.state;

    const online = []; // 'away' & 'busy' goes here too?
    const offline = [];

    if (memberships) {
      memberships.forEach((membership) => {
        switch(membership.member_id.online) {
          case true:
            // if (membership.member_id.status ==="Hide") offline.push()
            online.push(
              <List.Item key={membership.member_id.email}>
                <User user={membership.member_id} />
              </List.Item>
            );
            break;

          default:
            offline.push(
              <List.Item key={membership.member_id.email}>
                <Popup
                  trigger={<Button><User user={membership.member_id} /></Button>}
                  content={<UserCard user={membership.member_id} joined={membership.createdAt} />}
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
            <h3>Members {`(${memberships.length})`}</h3>
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

/* Members.propTypes = {
  serverId: PropTypes.string.isRequired
} */

export default Members;
