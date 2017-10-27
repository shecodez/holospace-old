import React, { Component } from 'react';

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
  render() {
    return (
      <div className="App grid">
        <Servers />

        <div class="nested">
          <CurrentServer />
          <Channels />
          <User />
        </div>

        <div class="nested">
          <CurrentChannel />
          <Chat />
        </div>

        <Friends />
      </div>
    );
  }
}

export default App;
