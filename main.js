// khai báo sử dụng module HTTP
var http = require('http');
const fs = require('fs');

//Khởi tạo server chạy cổng 8000
http.createServer(function (request, response) {
    //thiết lập giá trị server trả về
    // Cach 2
    fs.readFile(__dirname + "/index.html", "utf8", (err, content) => {
        if (err) {
            console.log(err);
        } else {
            response.writeHead(200, { "Content-type": "text/html; charset = utf8" });
            response.write(content);
            response.end();
        }
    })
    //Cach 1
    /* response.writeHead(200, { 'Content-Type': 'text/html; charset = utf-8' });
    fs.ReadStream("./index.html").pipe(response);
    response.end(); */
}).listen(5000);