import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allServersSelector } from "../../reducers/servers";

// import '../../assets/css/style.min.css';

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';
import Servers from '../server/servers';

// import CurrentServer from '../server/currentServer';
// import Channels from '../channel/channels';
import CurrentUser from '../user/currentUser';

// import CurrentChannel from '../channel/currentChannel';
// import Chat from '../chat/chat';

// import Members from '../member/members';


const Main = ({ user, servers }) => (
  <div className="main grid">
    { !user.confirmed && <ConfirmEmailReminder /> }

    <Servers/>

    <div className='nested'>
      {/* <CurrentServer />
      <Channels /> */}
      <CurrentUser user={user} />
    </div>

    <div className='nested'>
      {/* <CurrentChannel />
      <Chat /> */}
    </div>

    {/* <Members /> */}
  </div>
);

Main.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired,
  servers: PropTypes.arrayOf(PropTypes.shape({
    icon_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    servers: allServersSelector(state)
  }
}

export default connect(mapStateToProps)(Main);
