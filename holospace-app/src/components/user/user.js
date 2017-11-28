import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";

/* truncate = (text, n) => {
  if (text.length > n)
    return `${text.substring(0, n)  }...`;
  return text;
} */

const User = ({ user }) => (
  <div className="user">
    <div className="deets">
      <Image avatar src={ user.avatar } />
      <div className="online-status" />
    </div>
    <span className="content">
      { user.username }
      <span className="pin">{ `#${user.pin}` }</span>
    </span>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    // online: PropTypes.bool.isRequired,
    // status: PropTypes.string.isRequired
  }).isRequired
};

export default User;
