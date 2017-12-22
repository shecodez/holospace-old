import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HeaderNav = ({ user }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/">HoloSpace</Menu.Item>

    <Menu.Menu position="right">
      <Menu.Item>
        { user && <Link to="/@me">Open App</Link> }
        { !user && <Link to="/login">Login</Link> }
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

HeaderNav.propTypes = {
  user: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: !!state.user.username
  }
};

export default connect(mapStateToProps)(HeaderNav);
