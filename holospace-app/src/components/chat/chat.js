import React, { Component } from 'react';

//components
import History from './history';
import Chatbox from './chatbox';

class Chat extends Component {
  //avatar = http://res.cloudinary.com/shecodez/image/upload/c_scale,w_150/v1509234788/sasha.png
  constructor() {
    super();
    this.state = {
      history: [],
      //user: {},
      channel: {}
    };
    this.sendHandler = this.sendHandler.bind(this);
    /*
    // Connect to the server
    api_url = '~/servers/:id/channels/:id';
    this.socket = io(api_url).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
    */
  }

  /*setUser() {
    if (this.props.user.username === "Guest") {
      user = this.props.user;
      user.username = user.username +'#'+ user.id.slice(-4);

      return user;
    }
  }*/

  componentWillMount() {
    this.setState({
      channel: 'General',
      history: [{
        user_id: '1',
        message: 'I have no comment on the matter.',
        created_at: ''
      },
      {
        user_id: '2',
        message: 'Oh, come on Spock...',
        created_at: ''
      },
      {
        user_id: '3',
        message: 'Captain, please leave Spock alone...',
        created_at: ''
      },
      {
        user_id: '2',
        message: 'Bones! You know don\'t you! TEEEELLLLLLLL MEEEEEEEEEEEEEEEE!!!!!!!!!!!!111',
        created_at: ''
      },
      {
        user_id: '4',
        message: 'Dagnabbit Jim, I\'m a doctor not a Hobgoblin mind reader! And stop changin my darn username!',
        created_at: ''
      },
      {
        user_id: '5',
        message: 'Ze commander really hate it ven you call him ze Hobgoblin. Zid you know name-calling vas invented in Russia? :)',
        created_at: ''
      },
      {
        user_id: '6',
        message: '*Bows to the Commander* #NeverForget.',
        created_at: ''
      },{
        user_id: '2',
        message: 'So nobody is gonna talk about it?! Fine, I will never drink again... I can\'t remember anything! T.T',
        created_at: ''
      }]
    });
  }

  sendHandler(message) {
    const msgObj = {
      user_id: this.props.user.id,
      message
    };

    // Emit message to the servers
    //this.socket.emit('client:message', msgObj);

    this.addMessage(msgObj);
  }

  addMessage(message) {
    //console.log(message);
    let messages = this.state.history;
    messages.push(message);
    this.setState({history:messages});
  }

  render() {
    return (
      <div className="chat section">
        <History history={this.state.history} />
        <Chatbox onSend={this.sendHandler} channel={this.state.channel} />
      </div>
    );
  }
}

export default Chat;
