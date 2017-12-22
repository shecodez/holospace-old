/* let connections = { "channelId" : [ // Each channelId is an array
                                {
                                  "username": "user1", // First element
                                  "avatar": "u1.png",
                                  "pin": 1234
                                },
                                {
                                  "username": "user2", // Second element
                                  "avatar": "u2.png",
                                  "pin": 4321
                                }
                              ] // End "users" Array.
                     } // End Channels
 To add to connection ~ // connections['channelId'] = [user1, user2...];
*/


exports = module.exports = function(io) {
  let connections = {}; //{ "5a2d4483141fe19b48a02783" : [{username: 'me'}]};

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('channel:join', (data) => {
      socket.avatar = data.avatar,
      socket.username = data.username;
      socket.channel = data.channel;
      console.log(`${socket.username} connected to ${socket.channel}`);

      addUsertoChannel(socket.channel, {avatar: socket.avatar, username: socket.username});

      socket.join(data.channel);
      socket.broadcast.to(data.channel).emit('user:join', `${data.username} joined your channel`);

      //socket.emit('connections:update', connections);
      io.sockets.emit('connections:update', connections);
    });

    socket.on('channel:switch', (newChannel) => {
      if(socket.channel)
          socket.leave(socket.channel);

      socket.join(newChannel);
      console.log(`${socket.username} switched to ${newChannel}`);

      removeUserFromChannel(socket.channel, socket.username);
      socket.broadcast.to(socket.channel).emit('user:left', `${socket.username} left your channel`);

      socket.channel = newChannel;
      addUsertoChannel(newChannel, {avatar: socket.avatar, username: socket.username});
      socket.broadcast.to(newChannel).emit('user:join', `${socket.username} joined your channel`);

      //socket.emit('connections:update', connections);
      io.sockets.emit('connections:update', connections);
    });

    /* socket.on('channel:left', (data) => {
      console.log(`channel:left -- ${data}`);
      //socket.leave(data.channel);
    }); */

    socket.on('disconnect', () => {
      //console.log('Client disconnected');

      removeUserFromChannel(socket.channel, socket.username);

      io.sockets.emit('connections:update', connections);
      socket.broadcast.emit('user:left', `${socket.username} disconnected`);
      console.log(`${socket.username} disconnected`);

      socket.leave(socket.room);
    });

    /* socket.on('user:typing', (data) => {
      socket.broadcast.to(data.channel).emit('user:typing', {
        username: data.username
      });
    });

    socket.on('user:typing', (data) => {
      socket.broadcast.to(data.channel).emit('user:typing', data);
    });*/
  });

  const addUsertoChannel = (channel, user) => {
    /* TODO: add array of sockets connected to each
      user so if the user opens another tab it will
      be considered another socket of the same user
    */
    if (connections[channel]) {
      connections[channel].push({
        avatar: user.avatar,
        username: user.username
      });
    } else {
      connections[channel] = [];
      connections[channel].push({
        avatar: user.avatar,
        username: user.username
      });
    }
  }

  const removeUserFromChannel = (channel, username) => {
    let users = connections[channel];
    if (users) {
      const index = users.map(user => { return user.username; }).indexOf(username);
      users.splice(index, 1);
      connections[channel] = users;
    }
  }
}

/* module.exports = (socket) => {
  var online = Object.keys(socket.engine.clients);
  socket.emit('init', JSON.stringify(online));
};*/
