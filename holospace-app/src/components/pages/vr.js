import React from "react";
import PropTypes from "prop-types";
// import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

import '../../assets/css/style.min.css';

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';
// import Servers from '../server/servers';

import CurrentServer from '../server/currentServer';
// import Channels from '../channel/channels';
import CurrentUser from '../user/currentUser';

import CurrentChannel from '../channel/currentChannel';
import Chat from '../chat/chat';

import Members from '../member/members';

const channel = {
  _id: "5a0f4bcb1c35354aa41d95bf",
  name: "General",
  type: "Text"
};

const server = {
  _id: "5a0f4bcb1c35354aa41d95bd",
  name: "Résumé | NJN"
};

const VR = ({ user }) => (
  <div className="grid grid-3c-vr">
    { !user.confirmed && <ConfirmEmailReminder /> }

    <div className='nested'>
      <div className="c2t section">
        <CurrentServer server={server} />
      </div>

      <div className="c2m stretch section">
        <Chat user={user} />
      </div>

      <div className="c2b section">
        <CurrentUser user={user} />
      </div>
    </div>

    <div className='nested'>
      <div className="c3t section">
        <CurrentChannel channel={channel} />
      </div>

      <div className="c3m stretch section" />
    </div>

    <div className="c4 section">
      <Members />
    </div>
  </div>
);

VR.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(VR);
