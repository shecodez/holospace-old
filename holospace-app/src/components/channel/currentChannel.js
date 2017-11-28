import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const CurrentChannel = ({ channel }) => (
  <div className="current-channel">
    <div>
      <h3 className="name">
        <span>{(channel.type === 'Text') ? '#' : ''}</span> {channel.name}
      </h3>
      { channel.topic &&
        <span className="topic">{channel.topic}</span>
      }
    </div>

    <Button.Group>
      <Button icon="bell outline" />
      <Button icon="search" />
      <Button icon="calendar plus" />
    </Button.Group>
  </div>
);

export default CurrentChannel;

CurrentChannel.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    topic: PropTypes.string,
    type: PropTypes.string.isRequired
  }).isRequired
}
