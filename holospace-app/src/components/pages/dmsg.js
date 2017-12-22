import React from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";
import { connect } from "react-redux";

import "../../assets/css/style.min.css";

// conponents
import ConfirmEmailReminder from "../alerts/confirmEmailReminder";
import Servers from "../server/servers";

import Channels from "../channel/channels";
import CurrentUser from "../user/currentUser";

import CurrentChannel from "../channel/currentChannel";
import Chat from "../chat/chat";

const DMsg = ({ user, match }) => (
  <div className="site-grid-r2">
    <div className="c1 section">
      <div className="user-btn">
        <Popup
          trigger={
            <Button primary circular size="huge" icon="user circle outline" />
          }
          inverted
          content={"User profile"}
          position="right center"
        />
      </div>
      <Servers match={match} />
    </div>

    <div className="two-r">
      {!user.confirmed && <ConfirmEmailReminder />}
      <div className="grid grid-3c">
        <div className="nested">
          <div className="c2t section">
            <div style={{ textAlign: 'center', height: '28px', lineHeight: '28px' }}>
              Direct Messages
            </div>
          </div>

          <div className="c2m stretch section">
            <Channels match={match} direct />
          </div>

          <div className="c2b section">
            <CurrentUser user={user} />
          </div>
        </div>

        <div className="nested">
          <div className="c3t section">
            <CurrentChannel match={match} direct />
          </div>

          <div className="c3m stretch section">
            <Chat user={user} match={match} direct />
          </div>
        </div>
      </div>
    </div>
  </div>
);

DMsg.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({})
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DMsg);
