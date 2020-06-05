const fs = require('fs');
var readFileName = (pathName, res) => {
    res.writeHead(200, "Content-type: txt/html; charset = utf8");
    fs.ReadStream(pathName).pipe(res);
}

var router = (req, res) => {
    // console.log(req.url);
    var path = req.url;
    switch (path) {
        case "/":
            readFileName("./Interface1.html", res);
            break;
        case "/system":
            readFileName("./Interface2.html", res);
            break;
        default:
            res.writeHead(404);
            res.write("Khong tim thay")
    }
}
module.exports.router = router;