import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const CurrentServer = ({ server }) => (
  <div className="current-server">
    <h3 className="name">{server.name}</h3>

    <Button icon="content" />
  </div>
);

CurrentServer.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
}

export default CurrentServer;
