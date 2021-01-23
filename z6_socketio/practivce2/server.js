const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    /**
     * Cho user đó vào mảng user
     * // Join user to chat
        function userJoin(id, username, room) {
        // Thêm một user mới
        const user = { id, username, room };

        users.push(user);

      return user;
      }
     * 
     * 
     */
    // Một người mới tham gia phòng
    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info . Lấy thông tin của phòng và thông tin của users để đưa vào bảng broadcast
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
      /**
       * // Get room users: Lấy những user trong phòng đó
          function getRoomUsers(room) {
            return users.filter(user => user.room === room);
          }    
       */
    });
  });

  // Listen for chatMessage. Khi mà user hiện tại đang ở trong phòng rồi
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    /**
     * // Get current user
      function getCurrentUser(id) {
        return users.find(user => user.id === id);
      }
     */
    io.to(user.room).emit('message', formatMessage(user.username, msg)); // Cái này dùng để chat với tất cả mọi người ở trong nhóm đó
  });

  // Runs when client disconnects. Nếu số đó nó có tồn tại thì sẽ trả về thông báo
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    /**
     * // User leaves chat
    function userLeave(id) {
      // Tìm kiếm user có nằm trong mảng đó không. Trả về cái phần tử bằng với phần tử có id
      const index = users.findIndex(user => user.id === id);
      // Nếu có thì xóa nó đi 
      if (index !== -1) {
        return users.splice(index, 1)[0];
      }
    }
     */
    if (user) {
      //Gửi đến các user trong phòng đó với tin nhắn là đã rời phòng
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info . Lấy thông tin của phòng và thông tin của users để đưa vào bảng broadcast
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
      /**
       * // Get room users: Lấy những user trong phòng đó
        function getRoomUsers(room) {
          return users.filter(user => user.room === room);
        }    
       */
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
