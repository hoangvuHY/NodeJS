var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//Chat message
/* app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
}); */
app.get('/freetuts', function (req, res) {
  res.sendFile(__dirname + '/views/broadcasting.html');
});

/* io.on('connection', function (socket) {
  console.log('a user connected');
}); */
//Chat message
/* io.on("connection", function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
}); */
//broadcasting
var clients = 0;
io.on("connection", function (socket) {
  clients++;
  socket.emit("new msg", { msg: `Hiện tại có ${clients} đang kết nối !!` });
  socket.broadcast.emit("new noti", { msg: "Một người vừa mới tham gia ! " });
  socket.on("disconnect", function () {
    clients--;
    socket.broadcast.emit("new noti", { msg: "Một người vừa mới rời đi! " });
  });
});
//namespace
/* io.on("connection", function (socket) {
  const nsp = io.of('/freetuts');
  nsp.on('connection', function (socket) {
    console.log('Có người tham gia');
  });
  nsp.emit('hi', 'everyone!');
}); */
//rooms

var freetuts = io.of("/freetuts");
//Chi định namespace có tên /freetuts
freetuts.on("connection", function(socket) {
  console.log("Một người vừa kết nối.");
 
  //Nhận yêu cầu vào phòng từ clients
  socket.on("join room", function(data) {
    //THam gia phòng
    socket.join("freetutsRoom");
    //Trả lại thông báo cho người vào phòng
    socket.emit("notification", "Bạn đã tham gia vào phòng");
 
    //Trả lại thông báo cho tất cả người còn lại trong phòng
    freetuts.to("freetutsRoom").emit("notification", "Một người đã vào phòng.");
  });
 
  //Nhận yêu cầu rời phòng từ clients
  socket.on("leave room", function(data) {
    //Rời phòng
    socket.leave("freetutsRoom");
    //Trả lại thông báo cho người vào phòng
    socket.emit("notification", "Bạn đã rời phòng");
    //Trả lại thông báo cho tất cả người trong phòng
    freetuts.to("freetutsRoom").emit("notification", "Một người đã rời phòng.");
  });
});
 

http.listen(3000, function () {
  console.log('listening on *:3000');
});