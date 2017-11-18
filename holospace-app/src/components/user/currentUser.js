import React, { Component } from 'react';

// TODO: import icons for : no sound, mic, or VR
// [hear no evil], [speak no evil], [see no evil]

import User from './user';
import StatusButtons from './statusButtons';

class CurrentUser extends Component {
  render() {

    return (
      <div className="current-user section">
        <User user={this.props.user} />
        <StatusButtons />
      </div>
    );
  }
}

export default CurrentUser;
