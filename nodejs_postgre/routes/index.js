var express = require('express');
var router = express.Router();
/* K.n dữ liệu */
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodepostgre',
  password: '!vu15499',
  port: 5432,
})
/* K.n dữ liệu */

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  /* 
    pool.query('SELECT * FROM CONTACT ', (err, res) => {
      console.log(err, res)
      pool.end()
    }) */
});
/* GET  xem */
router.get('/xem', function (req, res, next) {
  pool.query('SELECT * FROM contact ORDER BY id ASC ', (err, data) => {
    res.render('xem', { title: 'Thêm dữ liệu vào PostgreSQL', data: data.rows });
  })
});
/* Thêm dữ liệu */

/* GET  thêm */
router.get('/them', function (req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu vào PostgreSQL' });

});

/* Post  thêm */
router.post('/them', function (req, res, next) {
  var ten = req.body.ten, tuoi = req.body.tuoi;
  console.log(ten, tuoi);
  pool.query('INSERT INTO contact(ten,tuoi) VALUES ($1,$2) ', [ten, tuoi], (err, res) => {
  })
  res.redirect('/xem');
  // res.render('them', { title: 'Thêm dữ liệu vào PostgreSQL' });
});
/* GET  xóa */
router.get('/xoa/:idcanxoa', function (req, res, next) {
  var idcanxoa = req.params.idcanxoa;
  pool.query('DELETE FROM contact WHERE id = $1 ', [idcanxoa], (err, data) => {
    res.redirect('/xem')
  })
});
/* GET  sửa */
router.get('/sua/:idcansua', function (req, res, next) {
  var idcansua = req.params.idcansua; 
  pool.query('SELECT * FROM contact  WHERE id = $1', [idcansua], (err, data) => {
    res.render('sua', { title: 'Sửa dữ liệu vào PostgreSQL', data: data.rows });
  })
});
/* GET  sửa */
router.post('/sua/:idcansua', function (req, res, next) {
  var idcansua = req.params.idcansua;
  var ten = req.body.ten, tuoi = req.body.tuoi;

  pool.query('UPDATE contact SET ten = $1,tuoi=$2 WHERE id = $3 ', [ten, tuoi, idcansua], (err, data) => {
    res.redirect('/xem')
  })
});

module.exports = router;
