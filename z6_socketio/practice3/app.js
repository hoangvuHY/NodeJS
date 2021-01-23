var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.json("hehehhe")
});

app.get('/freetuts', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

var freetuts = io.of("/freetuts");
//Chi định namespace có tên /freetuts
freetuts.on("connection", function (socket) {
  console.log("Một người vừa kết nối.");

  //Nhận yêu cầu vào phòng từ clients
  socket.on("join room", function (data) {
    //THam gia phòng
    socket.join("freetutsRoom");
    //Trả lại thông báo cho người vào phòng
    socket.emit("notification", "Bạn đã tham gia vào phòng");

    //Trả lại thông báo cho tất cả người còn lại trong phòng
    freetuts.to("freetutsRoom").emit("notification", "Một người đã vào phòng.");
  });

  //Nhận yêu cầu rời phòng từ clients
  socket.on("leave room", function (data) {
    //Rời phòng
    socket.leave("freetutsRoom");
    //Trả lại thông báo cho người vào phòng
    socket.emit("notification", "Bạn đã rời phòng");
    //Trả lại thông báo cho tất cả người trong phòng
    freetuts.to("freetutsRoom").emit("notification", "Một người đã rời phòng.");
  });
});
http.listen(3000, function () {
  console.log("listening on *:3000");
});