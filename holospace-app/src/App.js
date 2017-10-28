import React, { Component } from 'react';

import uuid from 'uuid';

// components
import Servers from './components/server/servers';

import CurrentServer from './components/server/currentServer';
import Channels from './components/channel/channels';
import User from './components/user/user';

import CurrentChannel from './components/channel/currentChannel';
import Chat from './components/chat/chat';

import Friends from './components/friend/friends';

import './assets/css/style.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      servers: []
    }
  }

  componentWillMount() {
    this.setState( {servers: [
      {
        id: uuid.v4(),
        icon_url: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509112212/tenfwd.jpg',
        name: 'Ten Forward'
      },
      {
        id: uuid.v4(),
        icon_url: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509112217/holodeck.jpg',
        name: 'Holodeck 42'
      },
      {
        id: uuid.v4(),
        icon_url: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509112211/borderlands.jpg',
        name: 'Borderlands'
      }
    ]} );
  }

  render() {
    return (
      <div className="App grid">
        <Servers servers={ this.state.servers } />

        <div className="nested">
          <CurrentServer />
          <Channels />
          <User />
        </div>

        <div className="nested">
          <CurrentChannel />
          <Chat />
        </div>

        <Friends />
      </div>
    );
  }
}

export default App;
