import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
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
        id: 1,
        name: 'Ten Forward',
        lang: 'EN',
        icon_url: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509112212/tenfwd.jpg'
      }
    });
  }

  getServers() {
    this.setState({
      servers: [
        {
          id: 1,
          name: 'Ten Forward',
          lang: 'EN',
          icon_url: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509112212/tenfwd.jpg'
        },
        {
          id: 2,
          name: '天龍資聖禅寺',
          lang: 'JP',
          icon_url: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509902745/koifish_prvqlk.png'
        }
      ]
    });
  }

  getCurrentChannel() {
    this.setState({
      currentChannel: {
        id: 1,
        name: 'General',
        type: 'Text',
        topic: 'Designer and Developer',
        server_id: 1
      }
    });
  }

  getChannels() {
    this.setState({
      channels: [
        {
          id: 1,
          name: 'General',
          type: 'Text',
          topic: 'Designer and Developer',
          server_id: 1
        },
        {
          id: 2,
          name: 'Education',
          type: 'Text',
          topic:'Go to school, get y\'alls education ~Nicki Minaj',
          server_id: 1
        },
        {
          id: 3,
          name: 'Experience',
          type: 'Text',
          topic: 'Designer and Developer',
          server_id: 1
        },
        {
          id: 4,
          name:'Why Me?',
          type: 'Voice',
          topic: '',
          server_id: 1
        },
        {
          id: 5,
          name: 'Comming Soon',
          type: 'VR',
          topic: 'This is the future of social communication',
          server_id: 1
        },
        {
          id: 6,
          name: '一般の',
          type: 'Text',
          topic: '',
          server_id: 2
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

    //getServers().then(servers => this.setState({ servers, currentServer: servers[0] }));
  }

  addNewChannel(channel) {
    let channels = this.state.channels;
    channels.push(channel);
    this.setState({channels:channels});
  }

  addNewServer(server) {
    let servers = this.state.servers;
    servers.push(server);
    this.setState({servers:servers});

    // TODO: add i18n so t('General') is
    // written in the users server.language
    var generalChannel = {
      id: uuid.v4(),
      name: 'General',
      type: 'Text',
      topic: '',
      server_id: server.id
    }
    this.addNewChannel(generalChannel);
  }

  setCurrentServer(server) {
    this.setState({ currentServer: server });
    //resetCurrentChannel TODO: this is NOT efficient...
    var chs = this.state.channels.filter(({server_id}) => server_id === server.id);
    this.setCurrentChannel(chs[0]);
  }

  setCurrentChannel(channel) {
    this.setState({ currentChannel: channel });
  }

  filteredChannels() {
    return this.state.channels.filter(({server_id}) => server_id === this.state.currentServer.id);
  }

  render() {
    return (
      <div className='App grid'>
        <Servers
          servers={this.state.servers}
          currentServerId={this.state.currentServer.id}
          setCurrentServer={this.setCurrentServer.bind(this)}
          addNewServer={this.addNewServer.bind(this)}
        />

        <div className='nested'>
          <CurrentServer currentServer={this.state.currentServer} />

          <Channels
            channels={this.filteredChannels()}
            currentChannelId={this.state.currentChannel.id}
            setCurrentChannel={this.setCurrentChannel.bind(this)}
            currentServerId={this.state.currentServer.id}
            addNewChannel={this.addNewChannel.bind(this)}
          />
          <CurrentUser user={this.state.user} />
        </div>

        <div className='nested'>
          <CurrentChannel currentChannel={this.state.currentChannel}/>

          <Chat
            user={this.state.user}
            currentChannel={this.state.currentChannel}
          />
        </div>

        <Members members={this.state.members} />
      </div>
    );
  }
}

export default App;
