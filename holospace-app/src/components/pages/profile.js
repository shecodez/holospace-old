import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { allServersSelector } from "../../reducers/servers";
// import { allChannelsSelector } from "../../reducers/channels";

import '../../assets/css/style.min.css';

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';
import Servers from '../server/servers';

// import CurrentServer from '../server/currentServer';
// import UserAvatar from '../user/userAvatar';
import CurrentUser from '../user/currentUser';

// import CurrentChannel from '../channel/currentChannel';
// import Chat from '../chat/chat';

const Profile = ({ user }) => (
  <div className="grid grid-3c">
    { !user.confirmed && <ConfirmEmailReminder /> }

    <div className="c1 section">
      <div className="dmsg-btn">
        <Button primary circular size='huge' icon="envelope" />
      </div>
      <Servers />
    </div>

    <div className='nested'>
      <div className="c2t section">
        search form
      </div>

      <div className="c2m stretch section">
        user model
      </div>

      <div className="c2b section">
        <CurrentUser user={user} />
      </div>
    </div>

    <div className='nested'>
      <div className="c3t section">
        Tabs to change between friends and avatar wardrobe
      </div>

      <div className="c3m stretch section">
        Friends mutual servers
      </div>
    </div>
  </div>
);

Profile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired
  /* servers: PropTypes.arrayOf(PropTypes.shape({
    icon_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired */
};

function mapStateToProps(state) {
  return {
    user: state.user,
    servers: allServersSelector(state)
  }
}

export default connect(mapStateToProps)(Profile);
