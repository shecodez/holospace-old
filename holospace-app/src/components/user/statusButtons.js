import React from "react";
import { Button } from "semantic-ui-react";
// TODO: import icons for : no sound, mic, and VR
// [hear no evil], [speak no evil], [see no evil]

const StatusButtons = () => (
  <Button.Group>
    <Button icon="headphone" />
    <Button icon="microphone" />
    <Button icon="gamepad" />
    <Button icon="setting" />
  </Button.Group>
);

export default StatusButtons;
