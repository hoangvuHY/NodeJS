const mongoose = require('mongoose');
// getting-started.js
var connectDB = () => {
  // let URL = ``;
  mongoose.connect("mongodb://localhost/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Kết nối db thành công');
  });
  return mongoose;
};
connectDB();
module.exports = mongoose;  