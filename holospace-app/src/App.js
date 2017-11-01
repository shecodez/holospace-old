import React, { Component } from 'react';

import uuid from 'uuid';

// components
import Servers from './components/server/servers';

import CurrentServer from './components/server/currentServer';
import Channels from './components/channel/channels';
import CurrentUser from './components/user/currentUser';

import CurrentChannel from './components/channel/currentChannel';
import Chat from './components/chat/chat';

import Friends from './components/friend/friends';

import './assets/css/style.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      servers: [],
      channels: [],
      friends: []
    }
  }

  getUser() {
    this.setState({
      user: {
        id: uuid.v4(),
        username: 'Guest',
        pin: Math.round(Math.random() * 10000).toString(),
        avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
        online: true
      }
    });
  }
  //getServers(){}
  //getChannels(){}
  //getFriends(){}

  componentWillMount() {
    this.getUser();

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
      ],

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
      ],

      friends: [
        {
          id: uuid.v4(),
          username: 'Kirk',
          pin: Math.round(Math.random() * 10000).toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: true
        },
        {
          id: uuid.v4(),
          username: 'Spock',
          pin: Math.round(Math.random() * 10000).toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: false
        },
        {
          id: uuid.v4(),
          username: 'Star',
          pin: Math.round(Math.random() * 10000).toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: false
        },
        {
          id: uuid.v4(),
          username: 'Bones',
          pin: Math.round(Math.random() * 10000).toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: true
        },
        {
          id: uuid.v4(),
          username: 'Sulu',
          pin: Math.round(Math.random() * 10000).toString(),
          avatar: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png',
          online: true
        }
      ]
    });
  }

  render() {
    return (
      <div className='App grid'>
        <Servers servers={this.state.servers} />

        <div className='nested'>
          <CurrentServer />
          <Channels channels={this.state.channels} />
          <CurrentUser user={this.state.user} />
        </div>

        <div className='nested'>
          <CurrentChannel />
          <Chat user={this.state.user} />
        </div>

        <Friends friends={this.state.friends} />
      </div>
    );
  }
}

export default App;
