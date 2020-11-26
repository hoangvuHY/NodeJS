
var express = require('express');
var path = require('path');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

var server = require("http").Server(app);
var io = require('socket.io')(server);

var arrPlayer = [];


io.on("connection", (socket) => {
  socket.on('dangky', (data) => {
    console.log(data);
    var player = new Player(data, socket.id);
    arrPlayer.push(player);
    console.log(arrPlayer);
  })

  socket.on('binhchon', () => {
    var random = Math.random(Math.random() * arrPlayer.length);
    io.sockets.emit('ketqua', arrPlayer[random])
  })

})

app.get('/', function (req, res) {
  res.render('home');
})

app.get('/admin', function (req, res) {
  res.render('admin');
})

server.listen(3000, () => {
  console.log('Đã kết nối');
});

function Player(name, idSocket) {
  this.name = name;
  this.idSocket = idSocket;
}