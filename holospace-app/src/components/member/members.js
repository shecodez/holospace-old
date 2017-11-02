import React, { Component } from 'react';

import User from '../user/user';

class Members extends Component {

  render() {
    const online = []; //'away' & 'busy' goes here too?
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
        Members{"("+this.props.members.length+")"}

        <h4 className="toggle-online-members-btn">Online{"("+online.length+")"}</h4>
        <ul className="online-users">
          {online}
        </ul>

        <h4 className="toggle-offline-members-btn">Offline{"("+offline.length+")"}</h4>
        <ul className="offline-users">
          {offline}
        </ul>
      </div>
    );
  }
}

export default Members;
