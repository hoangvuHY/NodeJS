const http = require('http');
const Router = require('./Router.js');
http.createServer(Router.router).listen(8000);