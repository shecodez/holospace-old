import * as React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';
// TODO: import icons for : no sound, mic, and VR
// [hear no evil], [speak no evil], [see no evil]

export default class StatusButtons extends React.Component {
  render() {
    return (
      <div>
        <button><SimpleLineIcon name="earphones" /></button>
        <button><SimpleLineIcon name="microphone" /></button>
        <button><SimpleLineIcon name="eyeglass" /></button>
        <button><SimpleLineIcon name="settings" /></button>
      </div>
    );
  }
}
