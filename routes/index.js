var express = require('express');
var router = express.Router();

const dishController = require('../controllers').dishes;
const hotelController = require('../controllers').hotels;
const authController = require('../controllers').auth;
var VerifyToken = require('./VerifyToken');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/login', authController.login);
router.get('/api/logout', VerifyToken, authController.logout);

router.get('/api/dishes', VerifyToken, dishController.list);
router.get('/api/dishes/:id', VerifyToken, dishController.getById);
router.post('/api/dishes', VerifyToken, dishController.add);
router.put('/api/dishes/:id', VerifyToken, dishController.update);
router.delete('/api/dishes/:id', VerifyToken, dishController.delete);

router.get('/api/hotel', VerifyToken, hotelController.list);
router.get('/api/hotel/:id', VerifyToken, hotelController.getById);

module.exports = router;
