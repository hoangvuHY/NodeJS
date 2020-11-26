
var express = require('express');
var path = require('path');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

var server = require("http").Server(app);
var io = require('socket.io')(server);


io.on("connection", (socket) => {
  console.log('Có người kết nối ' + socket.id);
  socket.on('demo', (data) => {
    console.log('data: ' + data);
    var n = parseInt(data);
    n++;
    // socket.emit('server-emit', n)
    // socket.broadcast.emit('server-emit', n) Gửi đến tất cả mọi người trừ mình
    io.sockets.emit('server-emit', n);// Gửi đến với tất cả mọi người trong đó có bản thân

  })
})

app.get('/', function (req, res) {
  res.render('home');
})

server.listen(3000, () => {
  console.log('Đã kết nối');
});