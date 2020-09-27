var express = require('express');
var router = express.Router();
// Data mongodb
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;


const assert = require('assert');
const { ReplSet } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'contact';

// Use connect method to connect to the server: Use Check
/* MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
}); */

/* End data mongodb */

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET them. */
router.get('/them', function (req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu mới' });
});
/* Post them. */
router.post('/them', function (req, res, next) {

  var dulieu01 = {
    "ten": req.body.ten,
    "dt": req.body.dt
  }
  const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Insert some documents
    collection.insert(dulieu01, function (err, result) {
      assert.equal(err, null);
      console.log("Inserted Success");
      callback(result);
    });
  }

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function () {
      client.close();
    });
  });

  res.redirect("/them");
});


/* GET Xem. */
router.get('/xem', function (req, res, next) {

  const findDocuments = function (db, callback) {
    const collection = db.collection('nguoidung');
    collection.find({}).toArray(function (err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
  }
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    findDocuments(db, function (dulieu) {
      res.render('xem', { title: 'Xem dữ liệu', data: dulieu });
      client.close();
    });
  });


  /* GET home page. */
  router.get('/xoa/:idcanxoa', function (req, res, next) {

    var idcanxoa = ObjectID(req.params.idcanxoa);
    console.log(typeof idcanxoa);

    const removeDocument = function (db, callback) {
      // Get the documents collection
      const collection = db.collection('nguoidung');
      // Delete document where a is 3
      collection.deleteOne({ _id: idcanxoa }, function (err, result) {
        assert.equal(err, null);
        // assert.equal(1, result.result.n);
        // console.log("Removed the document with the field a equal to 3");
        callback(result);
      });
    }


    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      // console.log("Connected successfully to server");

      const db = client.db(dbName);

      removeDocument(db, function () {
        client.close();
      });
    });

    res.redirect("/xem")
    // res.write("Xoa thanh cong")

  });

})

/* GET home page. */
router.get('/sua/:idcansua', function (req, res, next) {
  var idcansua = ObjectID(req.params.idcansua);
  const findDocuments = function (db, callback) {
    const collection = db.collection('nguoidung');
    collection.find({ _id: idcansua }).toArray(function (err, docs) {
      assert.equal(err, null);
      console.log('Da tim thay');
      callback(docs);
    });
  }
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    findDocuments(db, function (dulieu) {
      res.render('sua', { title: 'Sửa dữ liệu', data: dulieu });
      client.close();
      console.log(dulieu);
    });
  });

});

/* GET home page. */
router.post('/sua/:idcansua', function (req, res, next) {

  var idcansua = ObjectID(req.params.idcansua);

  var dulieu01 = {
    "ten": req.body.ten,
    "dt": req.body.dt
  }
  const updateDocument = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ _id: idcansua }
      , { $set: dulieu01 }, function (err, result) {
        assert.equal(err, null);
        callback(result);
      });
  }
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    updateDocument(db, function () {
      client.close();
    });
  });
  res.redirect("/xem")
});
module.exports = router;
