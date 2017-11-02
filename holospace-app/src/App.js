import React, { Component } from 'react';

import uuid from 'uuid';

// components
import Servers from './components/server/servers';

import CurrentServer from './components/server/currentServer';
import Channels from './components/channel/channels';
import CurrentUser from './components/user/currentUser';

import CurrentChannel from './components/channel/currentChannel';
import Chat from './components/chat/chat';

import Members from './components/member/members';

import './assets/css/style.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      servers: [],
      currentServer: {},
      channels: [],
      currentChannel: {},
      members: []
    }
  }

  generatePin() {
    var pin = Math.round(Math.random() * 10000);
    if (pin < 1000) {
      pin += 1000;
    }
    return pin;
  }

  getUser() {
    this.setState({
      user: {
        id: uuid.v4(),
        username: 'Guest',
        pin: this.generatePin().toString(),
        avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
        online: true
      }
    });
  }

  getCurrentServer() {
    this.setState({
      currentServer: {
        id: uuid.v4(),
        icon_url: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509112212/tenfwd.jpg',
        name: 'Ten Forward'
      }
    });
  }

  getServers() {
    this.setState({
      servers: [
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
      ]
    });
  }

  getCurrentChannel() {
    this.setState({
      currentChannel: {
        id: uuid.v4(),
        type: 'Text',
        name: 'General',
        topic: 'Nothing is off limits here'
      }
    });
  }

  getChannels() {
    this.setState({
      channels: [
        {
          id: uuid.v4(),
          type: 'Text',
          name: 'General'
        },
        {
          id: uuid.v4(),
          type: 'Text',
          name: 'Niico\'s Corner'
        },
        {
          id: uuid.v4(),
          type: 'Voice',
          name: 'W3 Raiders'
        },
        {
          id: uuid.v4(),
          type: 'Voice',
          name: 'Danger Zone'
        },
        {
          id: uuid.v4(),
          type: 'VR',
          name: 'Kobayashi Maru'
        }
      ]
    });
  }

  getMembers() {
    this.setState({
      members: [
        {
          id: uuid.v4(),
          username: 'Kirk',
          pin: this.generatePin().toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: true
        },
        {
          id: uuid.v4(),
          username: 'Spock',
          pin: this.generatePin().toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: false
        },
        {
          id: uuid.v4(),
          username: 'Star',
          pin: this.generatePin().toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: false
        },
        {
          id: uuid.v4(),
          username: 'Bones',
          pin: this.generatePin().toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: true
        },
        {
          id: uuid.v4(),
          username: 'Sulu',
          pin: this.generatePin().toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: true
        }
      ]
    });
  }

  componentWillMount() {
    this.getUser();
    this.getServers();
    this.getCurrentServer();
    this.getChannels();
    this.getCurrentChannel();
    this.getMembers();
  }

  render() {
    return (
      <div className='App grid'>
        <Servers servers={this.state.servers} />

        <div className='nested'>
          <CurrentServer currentServer={this.state.currentServer} />
          <Channels channels={this.state.channels} />
          <CurrentUser user={this.state.user} />
        </div>

        <div className='nested'>
          <CurrentChannel currentChannel={this.state.currentChannel}/>
          <Chat user={this.state.user} />
        </div>

        <Members members={this.state.members} />
      </div>
    );
  }
}

export default App;
