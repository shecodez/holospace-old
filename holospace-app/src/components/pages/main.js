import React from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";
import { connect } from "react-redux";

import '../../assets/css/style.min.css';

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';
import Servers from '../server/servers';

import CurrentServer from '../server/currentServer';
import Channels from '../channel/channels';
import CurrentUser from '../user/currentUser';

import CurrentChannel from '../channel/currentChannel';
import Chat from '../chat/chat';

import Members from '../member/members';

const Main = ({ user, match }) => (
  <div className="grid grid-4c">
    { !user.confirmed && <ConfirmEmailReminder /> }

    <div className="c1 section">
      <div className="user-btn">
        <Popup
          trigger={
            <Button primary circular size='huge' icon="envelope" />
          }
          inverted
          content={"Direct Message"}
          position='right center'
        />
      </div>
      <Servers match={match} />
    </div>

    <div className='nested'>
      <div className="c2t section">
        <CurrentServer match={match} />
      </div>

      <div className="c2m stretch section">
        <Channels match={match} />
      </div>

      <div className="c2b section">
        <CurrentUser user={user} />
      </div>
    </div>

    <div className='nested'>
      <div className="c3t section">
        <CurrentChannel match={match} />
      </div>

      <div className="c3m stretch section">
        <Chat user={user} match={match} />
      </div>
    </div>

    <div className="c4 section">
      <Members match={match} />
    </div>
  </div>
);

Main.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      serverId: PropTypes.string.isRequired,
      channelId: PropTypes.string.isRequired
    })
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Main);
