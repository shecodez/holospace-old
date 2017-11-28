import React from "react";
import { Button, Popup } from "semantic-ui-react";
// TODO: import icons for : no sound, mic, and VR
// [hear no evil], [speak no evil], [see no evil]

const StatusButtons = () => (
  <Button.Group>
    <Popup
      trigger={<Button icon="headphone" />}
      content='Hear No Evil'
      inverted
      position='top center'
    />
    <Popup
      trigger={<Button icon="microphone" />}
      content='Speak No Evil'
      inverted
      position='top center'
    />
    <Popup
      trigger={<Button icon="gamepad" />}
      content='See No Evil'
      inverted
      position='top center'
    />
    <Popup
      trigger={<Button icon="setting" />}
      content='User Settings'
      inverted
      position='top center'
    />
  </Button.Group>
);

export default StatusButtons;
