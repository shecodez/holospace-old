import React, { Component } from 'react';

import User from '../user/user';

class Friends extends Component {

  render() {
    const online = []; //'away' & 'busy' goes here too?
    const offline = [];
    if (this.props.friends) {
      this.props.friends.forEach((friend) => {
        switch(friend.online) {
          case true:
            online.push(<li key={friend.id}><User user={friend} /></li>);
            break;
          case false:
            offline.push(<li key={friend.id}><User user={friend} /></li>);
            break;
          default:
            online.push(<li key={friend.id}><User user={friend} /></li>);
        }
      });
    }

    return (
      <div className="friends section">
        Friends

        <h4 className="toggle-online-friends-btn">Online{"("+online.length+")"}</h4>
        <ul className="online-users">
          {online}
        </ul>

        <h4 className="toggle-offline-friends-btn">Offline{"("+offline.length+")"}</h4>
        <ul className="offline-users">
          {offline}
        </ul>
      </div>
    );
  }
}

export default Friends;
