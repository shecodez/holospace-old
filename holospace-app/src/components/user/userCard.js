import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Icon, Label } from "semantic-ui-react";
import moment from "moment";

// components
import MessageForm from "../forms/messageForm";

const header = (member, joined) => (
  <div>
    <div className="user" style={{ display: "inline-block" }}>
      <div className="deets">
        <Image avatar src={ member.avatar } />
        <div className="online-status" />
      </div>
    </div>
    {member.username}#{member.pin}<br />
    Member since: { moment(joined).format('MMM YYYY') }
  </div>
);

const main = (role) => (
  <div className="horizontal-group">
    <div className="g-row">
      <Icon name='shield' /> Role
      <Label.Group size='mini' className="user-roles">
        <Label basic color='violet'>
          {role} <Icon name='delete' />
        </Label>
        <Label as='button'>
          <Icon name='plus' style={{ margin: '0' }} />
        </Label>
      </Label.Group>
    </div>
    <div className="g-row">
      <Icon name="sticky note outline" /> Note
      <div>
        blah blah blah...
      </div>
    </div>
  </div>
);

class UserCard extends React.Component {

  submit = data => {
    console.log(data);
    // this.props.createDirectMessage(data);
  }

  render() {
    const { member, joined, owner } = this.props;

    let serverOwner = false;
    if (owner.username === member.username && owner.pin === member.pin)
      serverOwner = true;

    const role = serverOwner ? 'owner' : 'member';

    return (
      <Card fluid className="user-card">
        <Card.Content header={ header(member, joined) } />
        <Card.Content description={ main(role) } />
        <Card.Content extra>
          {!serverOwner && <MessageForm submit={this.submit} message_label={`Message @${member.username}`} />}
        </Card.Content>
      </Card>
    );
  }
}


UserCard.propTypes = {
  member: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  joined: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    username: PropTypes.string.isRequired,
    pin: PropTypes.number.isRequired
  }).isRequired
};

export default UserCard;
