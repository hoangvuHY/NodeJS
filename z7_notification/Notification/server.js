var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);




http.listen(3000, () => {
  console.log('Success connected');
  io.on('connection', (socket) => {
    console.log('Ath value: ' + socket.id);
    socket.on('send_notification', (detail) => {
      socket.broadcast.emit('send_notification', detail);
    })
  })
})
