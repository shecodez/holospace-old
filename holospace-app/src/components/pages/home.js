import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from  "../../actions/auth";

// components
import HeaderNav from "../navigation/headerNav";

const Home = () => (
  <div>
    <header>
      <HeaderNav />
    </header>

    <h1>Home Page</h1>
  </div>
);

Home.propTypes = {
  // isAuthenticated: PropTypes.bool.isRequired,
  // logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(Home);

/* {isAuthenticated ? (
  <button onClick={ () => logout() }>Logout</button>
) : (
  <Link to="/login">Login</Link>
)} */
