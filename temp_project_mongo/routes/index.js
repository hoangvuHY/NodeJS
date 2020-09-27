var express = require('express');
var router = express.Router();

//Mongo
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'temp';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
//End mongodb

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET Insert. */
router.get('/insert', function (req, res, next) {
  res.render('insert', { title: 'Insert Page' });
});

/* Post insert. */
router.post('/insert', function (req, res, next) {

  var dataUser = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  };

  const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Insert some documents
    collection.insert(dataUser, function (err, result) {
      assert.equal(err, null);
      // console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);

    insertDocuments(db, function () {
      client.close();
    });
  });

  res.redirect("/display");


});


/* GET display. */
router.get('/display', function (req, res, next) {

  const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
      assert.equal(err, null);
      // console.log("Found the following records");
      // console.log(docs)

      callback(docs);
    });
  }
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    // console.log("Connected correctly to server");

    const db = client.db(dbName);

    findDocuments(db, function (users) {
      console.log(users);
      res.render('display', { title: 'Display Users', listedUser: users });
      client.close();
    });
  });
});


/* GET Insert. */
router.get('/delete/:idUser', function (req, res, next) {
  var idUser = ObjectID(req.params.idUser);
  console.log(idUser);
  const removeDocument = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Delete document where a is 3
    collection.deleteOne({ _id: idUser }, function (err, result) {
      assert.equal(err, null);
      callback(result);
    });
  }
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    removeDocument(db, function () {
      client.close();
    });
  });
  res.redirect("/display");
  // res.render('delete', { title: 'Delete Page' });
});

/* GET home page. */
router.get('/edit/:idUser', function (req, res, next) {
  var idUser = ObjectID(req.params.idUser);
  const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.find({ _id: idUser }).toArray(function (err, docs) {
      assert.equal(err, null);
      // console.log("Found the following records");
      // console.log(docs)

      callback(docs);
    });
  }
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    // console.log("Connected correctly to server");

    const db = client.db(dbName);

    findDocuments(db, function (users) {
      console.log(users);
      res.render('edit', { title: 'Edit Users', listedUser: users });
      client.close();
    });
  });

});

/* POST home page. */
router.post('/edit/:idUser', function (req, res, next) {

  var idUser = ObjectID(req.params.idUser);

  var dataUser = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  };
  console.log(dataUser);
  const updateDocument = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ _id: idUser }
      , { $set: dataUser }, function (err, result) {
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
  res.redirect("/display")
});

module.exports = router;
