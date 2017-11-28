import React from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

// components
import User from './user';
import StatusButtons from './statusButtons';
import OnlineStatus from "./onlineStatus";

class CurrentUser extends React.Component {
  state = {
    user: this.props.user
  };

  render() {
    const {  user } = this.state;

    return(
      <div className="current-user">
        <Popup
          trigger={<Button><User user={user} /></Button>}
          content={<OnlineStatus />}
          on='click'
        />
        <StatusButtons />
      </div>
    );
  }
};

CurrentUser.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    // online: PropTypes.bool.isRequired,
    // status: PropTypes.string.isRequired
  }).isRequired
};

export default CurrentUser;
