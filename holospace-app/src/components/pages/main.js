import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// conponents
import ConfirmEmailReminder from '../alerts/confirmEmailReminder';

const Main = ({ isConfirmed }) => (
  <div className="main grid">
    {!isConfirmed && <ConfirmEmailReminder />}
    Main Page
  </div>
);

Main.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps)(Main);
