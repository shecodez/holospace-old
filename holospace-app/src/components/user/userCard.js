import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Icon, Label } from "semantic-ui-react";
import moment from "moment";

// components
import MessageForm from "../forms/messageForm";

const header = (user, joined) => (
  <div>
    <div className="user" style={{ display: "inline-block" }}>
      <div className="deets">
        <Image avatar src={ user.avatar } />
        <div className="online-status" />
      </div>
    </div>
    {user.username}#{user.pin}<br />
    Member since: { moment(joined).format('MMM YYYY') }
  </div>
);

const main = () => (
  <div className="horizontal-group">
    <div className="g-row">
      <Icon name='shield' /> Role
      <Label.Group size='mini' className="user-roles">
        <Label basic color='violet'>
          Admin
          <Icon name='delete' />
        </Label>
        <Label as='a'>
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
    const { user, joined } = this.props;
    return (
      <Card fluid className="user-card">
        <Card.Content header={ header(user, joined) } />
        <Card.Content description={ main() } />
        <Card.Content extra>
          <MessageForm submit={this.submit} message_label={`Message @${user.username}`} />    
        </Card.Content>
      </Card>
    );
  }
}


UserCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  joined: PropTypes.string.isRequired
};

export default UserCard;
