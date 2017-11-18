import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopNav = ({ user }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/">HoloSpace</Menu.Item>

    <Menu.Menu position="right">
      <Menu.Item>
        { user && <Link to="/channels/@me">Open App</Link> }
        { !user && <Link to="/login">Login</Link> }
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

TopNav.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    user: !!state.user.username
  }
};

export default connect(mapStateToProps)(TopNav);
