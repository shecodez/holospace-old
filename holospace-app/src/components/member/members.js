import React, { Component } from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

import User from '../user/user';

class Members extends Component {

  render() {
    const online = []; // 'away' & 'busy' goes here too?
    const offline = [];
    if (this.props.members) {
      this.props.members.forEach((member) => {
        switch(member.online) {
          case true:
            online.push(<li key={member.id}><User user={member} /></li>);
            break;
          case false:
            offline.push(<li key={member.id}><User user={member} /></li>);
            break;
          default:
            online.push(<li key={member.id}><User user={member} /></li>);
        }
      });
    }

    return (
      <div className="members section">
        <div className="header">
          <div>
            <button><SimpleLineIcon name="arrow-right" /></button>
            Members{`(${this.props.members.length})`}
          </div>
          <a><SimpleLineIcon name="magnifier" /></a>
        </div>

        <h4 className="toggle-online-members-btn">Online{`(${online.length})`}</h4>
        <ul className="online-users">
          {online}
        </ul>

        <h4 className="toggle-offline-members-btn">Offline{`(${offline.length})`}</h4>
        <ul className="offline-users">
          {offline}
        </ul>
      </div>
    );
  }
}

export default Members;
