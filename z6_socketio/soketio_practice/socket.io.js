
var socket_io = require('socket.io');

let io = socket_io();
let socketAPI = {};
socketAPI.io = io;
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('server to client', msg);

    // io.emit('server to client', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
module.exports = socketAPI